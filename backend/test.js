import { handler } from "./index.js";

const event = {
  body: JSON.stringify({
    name: "",
    email: "john.doe@example.com",
    message: "example message",
  }),
};

handler(event).then(console.log).catch(console.error);
