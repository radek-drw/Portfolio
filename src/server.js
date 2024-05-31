require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submission
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Simple form validation
  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Set up email data
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email: " + error.message);
    }
    res.send("Email sent successfully!");
  });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
