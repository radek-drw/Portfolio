import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "eu-west-1" });

const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

function validateInput({ name, email, message }) {
  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Please enter a name";
  }

  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email";
  }

  if (!message || message.trim() === "") {
    errors.message = "Please enter a message";
  }

  return errors;
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    // validate inputs
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

    const fromAddress = "rdrweski@gmail.com";
    const toAddress = "rdrweski@gmail.com";

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
          Data: "New message from Contact Form",
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
        message: "Email sent successfully",
      }),
    };
  } catch (err) {
    console.error("SES Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to send email",
      }),
    };
  }
};
