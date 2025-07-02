import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Adjust CORS as needed for production

// POST /api/contact endpoint
app.post('/api/contact', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('company').optional().trim().escape(),
  body('message').trim().notEmpty().withMessage('Message is required'),
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation failed', error: errors.array() });
  }

  const { firstName, lastName, email, company = '', message } = req.body;

  // Email config
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // HTML email template
  const html = `
    <div style="background:#fff; color:#111; border-radius:12px; padding:32px; font-family:sans-serif; max-width:480px; margin:auto; border:1px solid #eee;">
      <h2 style="margin-top:0;">New Contact Form Submission</h2>
      <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
        <tr><td style="font-weight:bold; padding:8px 0;">First Name:</td><td>${firstName}</td></tr>
        <tr><td style="font-weight:bold; padding:8px 0;">Last Name:</td><td>${lastName}</td></tr>
        <tr><td style="font-weight:bold; padding:8px 0;">Email:</td><td>${email}</td></tr>
        <tr><td style="font-weight:bold; padding:8px 0;">Company:</td><td>${company}</td></tr>
      </table>
      <div style="margin-bottom:8px; font-weight:bold;">Message:</div>
      <div style="white-space:pre-line; border:1px solid #eee; border-radius:8px; padding:16px; background:#fafafa;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Contact Form Submission',
      html,
      replyTo: email,
    });
    res.json({ success: true, message: 'Message sent!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
});

// Disallow GET requests to /api/contact
app.get('/api/contact', (req, res) => {
  res.status(405).json({ success: false, message: 'GET not allowed' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 