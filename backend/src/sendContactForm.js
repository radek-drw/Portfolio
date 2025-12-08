// dotenv loads local .env vars into process.env for local tests
// In AWS Lambda, SES_FROM_ADDRESS is set in environment variables with its own value
// RECAPTCHA_BYPASS isn’t set in Lambda, so tokens are verified normally in the cloud

import dotenv from 'dotenv';
dotenv.config();
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: 'eu-west-1' });

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate form fields: required, email format, max length
function validateInput({ name, email, message }) {
  const errors = {};

  // Normalize values: ensure strings, replace null/undefined with "", then trim whitespace
  const safeName = String(name ?? '').trim();
  const safeEmail = String(email ?? '').trim();
  const safeMessage = String(message ?? '').trim();

  if (!safeName) errors.name = 'REQUIRED';
  else if (safeName.length > 50) errors.name = 'TOO_LONG';
  if (!safeEmail) errors.email = 'REQUIRED';
  else if (safeEmail.length > 254) errors.email = 'TOO_LONG';
  else if (!emailPattern.test(safeEmail)) errors.email = 'INVALID';
  if (!safeMessage) errors.message = 'REQUIRED';
  else if (safeMessage.length > 2000) errors.message = 'TOO_LONG';

  return errors;
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, email, message, recaptchaToken } = body;

    // 1. Verify reCAPTCHA token
    const bypass = process.env.RECAPTCHA_BYPASS === 'true';
    if (!bypass) {
      const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`,
      });

      const recaptchaData = await verifyResponse.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        return {
          statusCode: 403,
          body: JSON.stringify({
            success: false,
            message: 'reCAPTCHA verification failed',
          }),
        };
      }
    }

    // 2. Validate inputs
    const errors = validateInput({ name, email, message });
    if (Object.keys(errors).length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          errors,
        }),
      };
    }

    const fromAddress = process.env.SES_FROM_ADDRESS;
    const toAddress = 'rdrweski@gmail.com';

    const htmlBody = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;

    const params = {
      Destination: {
        ToAddresses: [toAddress],
      },
      Message: {
        Subject: {
          Data: 'New message from Contact Form',
        },
        Body: { Html: { Data: htmlBody } },
      },
      Source: fromAddress,
      ReplyToAddresses: [email],
    };

    const command = new SendEmailCommand(params);
    await sesClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
      }),
    };
  } catch (err) {
    console.error('SES Error:', err.name, err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to send email',
      }),
    };
  }
};
