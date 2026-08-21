import { Router } from 'express';

const router = Router();

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY_TURNS = 8; // user+model pairs kept from the client-sent history
const MAX_OUTPUT_TOKENS = 700;

// Simple in-memory sliding-window rate limit, keyed by IP.
// Good enough for a single-instance deploy; resets on restart.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

const SYSTEM_PROMPT = `You are the website assistant for Front Runner Restoration, a 24/7 property restoration company serving Florida.

Services offered, and when each one applies:
- Water damage restoration: extraction, structural drying, and dehumidification for any water loss (burst pipes, flooding, water used to fight a fire).
- Fire & smoke damage restoration: board-up, debris removal, HVAC/duct cleaning, and odor treatment after a fire.
- Dry ice blasting: non-abrasive CO2 pellet cleaning to strip soot, mold, and grime from surfaces, framing, ductwork, and equipment — relevant any time soot or heavy grime needs to come off a surface, including after a fire.
- Mold remediation & prevention: moisture source identification, containment, and removal of active mold growth.
- Storm damage restoration: roof tarping, board-up, debris removal, and flood water extraction after severe weather.
- 24/7 emergency response: live dispatch and on-site crews, statewide, for any of the above.

A single incident often needs more than one service — e.g. a house fire typically needs fire & smoke damage restoration AND water damage restoration (from extinguishing it) AND dry ice blasting (for soot on surfaces). Mention every service from the list above that plausibly applies to what the user describes, not just the most obvious one.

Service areas: South Florida, Central Florida, Tampa Bay, Gulf Coast, North Florida, Treasure Coast.
Emergency phone line (answered 24/7/365): 1-888-DRYOUT-2.

Answer general questions about these services, what to expect from the restoration process, and how to get help. Keep replies short (a few sentences) and conversational.
For an active emergency, or anything involving scheduling, pricing, or a specific property, tell the user to call 1-888-DRYOUT-2 or use the contact form on the site — do not invent prices, timelines, or availability.
Only discuss Front Runner Restoration and property restoration topics. If asked about anything unrelated, politely redirect to how you can help with restoration questions.
Respond in plain conversational text only. Do not use markdown formatting — no asterisks, bold, bullet points, or headers.`;

router.post('/', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ success: false, message: "You've sent a lot of messages — please wait a few minutes and try again, or call 1-888-DRYOUT-2." });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error('[chat] GEMINI_API_KEY is not set');
    return res.status(500).json({ success: false, message: 'Chat is not configured right now. Please call 1-888-DRYOUT-2.' });
  }

  const { message, history } = req.body || {};

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, message: 'Message is required.' });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ success: false, message: `Please keep messages under ${MAX_MESSAGE_LENGTH} characters.` });
  }

  const safeHistory = Array.isArray(history)
    ? history
        .filter((m) => m && (m.role === 'user' || m.role === 'model') && typeof m.text === 'string')
        .slice(-MAX_HISTORY_TURNS * 2)
    : [];

  const contents = [
    ...safeHistory.map((m) => ({ role: m.role, parts: [{ text: m.text.slice(0, MAX_MESSAGE_LENGTH) }] })),
    { role: 'user', parts: [{ text: message }] },
  ];

  try {
    const upstream = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          temperature: 0.4,
          // gemini-3.5-flash spends part of maxOutputTokens on invisible "thinking" by
          // default, which was eating almost the whole budget before any visible reply
          // was generated and causing replies to cut off after only a few words.
          // This is a simple FAQ bot with no multi-step reasoning need, so disable it.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      console.error('[chat] Gemini API error:', data);
      return res.status(502).json({ success: false, message: 'The assistant is unavailable right now. Please call 1-888-DRYOUT-2.' });
    }

    const candidate = data.candidates?.[0];
    let reply = candidate?.content?.parts?.map((p) => p.text).join('') || '';
    if (!reply) {
      return res.status(502).json({ success: false, message: "I couldn't come up with a response — please try rephrasing, or call 1-888-DRYOUT-2." });
    }

    if (candidate.finishReason === 'MAX_TOKENS') {
      // Trim to the last complete sentence so a hard cutoff doesn't end mid-word.
      const lastSentenceEnd = Math.max(reply.lastIndexOf('. '), reply.lastIndexOf('.\n'), reply.lastIndexOf('!'), reply.lastIndexOf('?'));
      if (lastSentenceEnd > 40) {
        reply = reply.slice(0, lastSentenceEnd + 1);
      }
      reply += "\n\n(That's the short version — call 1-888-DRYOUT-2 for the full details.)";
    }

    res.json({ success: true, reply });
  } catch (err) {
    console.error('[chat] Failed to reach Gemini:', err);
    res.status(502).json({ success: false, message: 'The assistant is unavailable right now. Please call 1-888-DRYOUT-2.' });
  }
});

export default router;
