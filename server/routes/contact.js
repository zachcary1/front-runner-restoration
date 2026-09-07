import { Router } from 'express';

const router = Router();

async function sendViaResend({ firstName, lastName, email, phone, service, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT;
  if (!apiKey || !recipient) return false;

  const from = process.env.RESEND_FROM || 'onboarding@resend.dev';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: recipient,
      reply_to: email,
      subject: `New restoration request: ${service} — ${firstName} ${lastName}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service needed: ${service}`,
        '',
        message,
      ].join('\n'),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error (${res.status}): ${body}`);
  }

  return true;
}

router.post('/', async (req, res) => {
  const { firstName, lastName, email, phone, service, message } = req.body || {};

  if (!firstName || !lastName || !email || !phone || !service) {
    return res.status(400).json({
      success: false,
      message: 'First name, last name, email, phone, and service are required.',
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  const phoneDigits = String(phone).replace(/\D/g, '');
  const isValidPhone = phoneDigits.length === 10 || (phoneDigits.length === 11 && phoneDigits.startsWith('1'));
  if (!isValidPhone) {
    return res.status(400).json({ success: false, message: 'Please provide a valid phone number.' });
  }

  const submission = { firstName, lastName, email, phone, service, message: message || '' };

  try {
    const sent = await sendViaResend(submission);
    if (!sent) {
      console.log('[contact] New submission (email not configured):', submission);
    }

    res.json({ success: true, message: "Thanks — we've received your request and will be in touch shortly." });
  } catch (err) {
    console.error('[contact] Failed to send notification:', err);
    res.status(500).json({ success: false, message: 'Something went wrong sending your request. Please call us directly.' });
  }
});

export default router;
