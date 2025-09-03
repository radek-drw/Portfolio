import { handler } from "./sendContactForm.js";

const event = {
  body: JSON.stringify({
    name: "John Doe",
    email: "test@example.com",
    message: "This is a test message",
  }),
};

handler(event)
  .then((response) => {
    console.log("Status:", response.statusCode);
    console.log("Body:", JSON.parse(response.body));
  })
  .catch((error) => {
    console.error("Error during test:", error);
  });
