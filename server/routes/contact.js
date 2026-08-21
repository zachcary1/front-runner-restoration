import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

function buildTransport() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
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

  const submission = { firstName, lastName, email, phone, service, message: message || '' };

  try {
    const transport = buildTransport();
    if (transport && process.env.CONTACT_RECIPIENT) {
      await transport.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_RECIPIENT,
        replyTo: email,
        subject: `New restoration request: ${service} — ${firstName} ${lastName}`,
        text: [
          `Name: ${firstName} ${lastName}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Service needed: ${service}`,
          '',
          submission.message,
        ].join('\n'),
      });
    } else {
      console.log('[contact] New submission (email not configured):', submission);
    }

    res.json({ success: true, message: "Thanks — we've received your request and will be in touch shortly." });
  } catch (err) {
    console.error('[contact] Failed to send notification:', err);
    res.status(500).json({ success: false, message: 'Something went wrong sending your request. Please call us directly.' });
  }
});

export default router;
