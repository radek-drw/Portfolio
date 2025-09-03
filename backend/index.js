import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "eu-west-1" });

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    const fromAddress = "rdrweski@gmail.com";
    const toAddress = "rdrweski@gmail.com";

    const params = {
      Destination: {
        ToAddresses: [toAddress],
      },
      Message: {
        Subject: {
          Data: "New message from Contact Form",
        },
        Body: {
          Text: {
            Data: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          },
        },
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
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
