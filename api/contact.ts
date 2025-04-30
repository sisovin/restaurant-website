import express from 'express';
import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

const router = express.Router();

// Email service setup
const transporter = nodemailer.createTransport({
  service: 'SendGrid', // or 'Gmail', 'Mailgun', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Handle contact form submissions
router.post('/contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.CONTACT_EMAIL,
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
