import nodemailer from 'nodemailer';

/*
  Contact form mail handler.

  Runs on the server, so the Gmail credentials never reach the browser.
  Configure in .env.local:
    GMAIL_USER=muneebdevs07@gmail.com
    GMAIL_APP_PASSWORD=<16-char Google App Password, not your login password>

  A Google App Password requires 2-Step Verification to be on:
  https://myaccount.google.com/apppasswords
*/

const TO_ADDRESS = 'muneebdevs07@gmail.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,19}$/;

/* naive in-memory throttle: max 5 sends per IP per 10 minutes */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 500) hits.clear(); // keep the map from growing unbounded
  return list.length > MAX_PER_WINDOW;
}

const escapeHtml = (str = '') =>
  String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (rateLimited(ip)) {
    return res
      .status(429)
      .json({ ok: false, error: 'Too many messages sent. Please try again later.' });
  }

  const { name = '', email = '', phone = '', message = '', company = '' } = req.body || {};

  /* honeypot: real people never fill a hidden field, bots do */
  if (company) return res.status(200).json({ ok: true });

  const errors = {};
  if (!String(name).trim()) errors.name = 'Name is required.';
  if (!EMAIL_RE.test(String(email).trim())) errors.email = 'A valid email is required.';
  if (String(phone).trim() && !PHONE_RE.test(String(phone).trim()))
    errors.phone = 'Phone number looks invalid.';
  if (String(message).trim().length < 10) errors.message = 'Message is too short.';

  if (Object.keys(errors).length) {
    return res.status(422).json({ ok: false, error: 'Please check the form fields.', errors });
  }

  const user = process.env.GMAIL_USER;
  /* Google displays App Passwords as "abcd efgh ijkl mnop" — strip the spaces
     so a copy-paste straight from Google still authenticates. */
  const pass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');

  if (!user || !pass) {
    console.error(
      '\n[contact] Mail NOT sent: GMAIL_APP_PASSWORD is empty in .env.local.' +
      '\n[contact] Add the 16-character App Password from' +
      ' https://myaccount.google.com/apppasswords and restart.\n'
    );
    return res.status(503).json({
      ok: false,
      error: 'Email is not configured on the server yet.',
      notConfigured: true,
    });
  }

  try {
    /* SMTP_HOST lets you point at another provider (or a local test server);
       without it we use Gmail's SMTP directly. */
    const transporter = process.env.SMTP_HOST
      ? nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user, pass },
          tls: { rejectUnauthorized: false },
        })
      : nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass },
        });

    const safe = {
      name: escapeHtml(name).trim(),
      email: escapeHtml(email).trim(),
      phone: escapeHtml(phone).trim() || '-',
      message: escapeHtml(message).trim(),
    };

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: TO_ADDRESS,
      replyTo: `${safe.name} <${String(email).trim()}>`, // hitting reply answers the visitor
      subject: `New portfolio enquiry from ${safe.name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\n${message}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#222">
          <h2 style="margin:0 0 16px">New portfolio enquiry</h2>
          <p style="margin:0 0 6px"><strong>Name:</strong> ${safe.name}</p>
          <p style="margin:0 0 6px"><strong>Email:</strong> ${safe.email}</p>
          <p style="margin:0 0 16px"><strong>Phone:</strong> ${safe.phone}</p>
          <p style="margin:0 0 6px"><strong>Message:</strong></p>
          <p style="margin:0;white-space:pre-wrap;padding:12px 14px;background:#f5f5f5;border-radius:6px">${safe.message}</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    /* EAUTH means the App Password is wrong/expired — worth calling out
       explicitly so it is not mistaken for a network problem. */
    if (err?.code === 'EAUTH') {
      console.error(
        '\n[contact] Gmail REJECTED the login.' +
        '\n[contact] Check GMAIL_APP_PASSWORD in .env.local is a 16-character' +
        ' App Password (not your normal Gmail password) and restart.\n'
      );
    } else {
      console.error('[contact] send failed:', err?.code || '', err?.message);
    }
    return res
      .status(502)
      .json({ ok: false, error: 'The message could not be sent. Please email me directly.' });
  }
}
