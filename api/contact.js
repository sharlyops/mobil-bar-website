import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  console.log('--- New Contact Form Submission ---');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, company, message } = req.body;
  const name = [firstName, lastName].filter(Boolean).join(' ');

  // Modern HTML email template with logo and no gold
  const htmlBody = `
    <div style="background:#f6f6f6;padding:40px 0;font-family:'Inter',Arial,sans-serif;">
      <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.07);padding:40px 32px 32px 32px;border-left:8px solid #111;">
        <div style="text-align:center;margin-bottom:24px;">
          <img src='https://calcuim.vercel.app/images/Logo.png' alt='Calcium Logo' style='height:56px;width:auto;object-fit:contain;'/>
        </div>
        <h2 style="font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;color:#111;margin-bottom:8px;margin-top:0;letter-spacing:-1px;">New Contact Form Submission</h2>
        <div style="height:4px;width:48px;background:#111;border-radius:2px;margin-bottom:32px;"></div>
        <table style="width:100%;border-collapse:separate;border-spacing:0 12px;font-size:1rem;">
          <tr>
            <td style="font-weight:600;color:#222;padding:0 0 0 0;width:120px;">Name:</td>
            <td style="color:#444;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight:600;color:#222;padding:0 0 0 0;">Email:</td>
            <td><a href="mailto:${email}" style="color:#111;text-decoration:none;">${email}</a></td>
          </tr>
          <tr>
            <td style="font-weight:600;color:#222;padding:0 0 0 0;">Company:</td>
            <td style="color:#444;">${company || '-'}</td>
          </tr>
          <tr>
            <td style="font-weight:600;color:#222;padding:0 0 0 0;vertical-align:top;">Message:</td>
            <td style="color:#444;white-space:pre-line;background:#fafafa;border-radius:8px;padding:16px 18px;">${message ? message.replace(/\n/g,'<br>') : '-'}</td>
          </tr>
        </table>
        <div style="margin-top:32px;font-size:0.95rem;color:#aaa;text-align:center;">
          <em>Sent from the Calcium Carbonate website contact form.</em>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Calcium Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'New Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Company: ${company}
      Message: ${message}
    `,
    html: htmlBody
  };

  try {
    await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    }).sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
} 