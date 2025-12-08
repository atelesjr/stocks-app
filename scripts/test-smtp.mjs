#!/usr/bin/env node
import nodemailer from 'nodemailer';

// Minimal SMTP verification + optional send script.
// Usage (PowerShell):
// $env:NODEMAILER_EMAIL='you@example.com'; $env:NODEMAILER_PASSWORD='app-password'; node scripts/test-smtp.mjs
// To allow insecure TLS for debugging only: $env:NODEMAILER_INSECURE_TLS='1'
// To actually send a test email: $env:TEST_SMTP_SEND='1'; $env:TEST_SMTP_TO='someone@domain.com'

const {
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
  NODEMAILER_INSECURE_TLS,
  TEST_SMTP_SEND,
  TEST_SMTP_TO,
} = process.env;

if (!NODEMAILER_EMAIL || !NODEMAILER_PASSWORD) {
  console.error('Missing NODEMAILER_EMAIL or NODEMAILER_PASSWORD environment variable.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
  tls: NODEMAILER_INSECURE_TLS === '1' ? { rejectUnauthorized: false } : undefined,
});

console.log('Verifying SMTP transporter... (this performs a network TLS handshake)');
try {
  await transporter.verify();
  console.log('Transporter verified: OK');
} catch (err) {
  console.error('Transporter verify failed:');
  console.error(err && err.message ? err.message : err);
  // Provide a hint for debugging
  console.error('\nHints:');
  console.error('- Are you behind a proxy or corporate firewall that intercepts TLS?');
  console.error("- If using Gmail, prefer an App Password (not account password) when 2FA is enabled.");
  console.error("- To inspect TLS chain, run: openssl s_client -connect smtp.gmail.com:587 -starttls smtp");
  process.exit(2);
}

if (TEST_SMTP_SEND === '1') {
  const to = TEST_SMTP_TO || NODEMAILER_EMAIL;
  console.log(`Sending a test message to ${to}...`);
  try {
    const info = await transporter.sendMail({
      from: NODEMAILER_EMAIL,
      to,
      subject: 'Signalist — SMTP test',
      text: 'This is a test message sent by scripts/test-smtp.mjs',
    });
    console.log('Test message sent:', info && (info.messageId || info.response));
  } catch (err) {
    console.error('Failed to send test message:');
    console.error(err && err.message ? err.message : err);
    process.exit(3);
  }
}

process.exit(0);
