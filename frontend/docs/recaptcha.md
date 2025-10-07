# How Google reCAPTCHA v3 Works

### Frontend

- **Load the reCAPTCHA Script** in `head` of `HTML`

  ```html
  <script src="https://www.google.com/recaptcha/api.js?render=SITE_KEY"></script>
  ```

  This script activates passive tracking of user behavior (mouse movements, clicks, scrolling, etc.)

- **Generate a Token**  
  When the user clicks the "Submit" button, the following function is triggered:

  ```javascript
  const token = await grecaptcha.execute("SITE_KEY", { action: "submit" });
  ```

  This sends collected behavioral data to Google, which returns a token — a secure, encrypted string summarizing the session

- **Send the token to the backend**  
  The token is added to the form data and sent to the server for verification

### Backend

- **Verify the Token**  
  The server sends a POST request to https://www.google.com/recaptcha/api/siteverify using the token received from the frontend and the secret key stored in environment variables

- **Receive Google's Response**  
  Google verifies the token and responds with a JSON object, for example:

```json
{
  "success": true,
  "score": 0.9,
  "action": "submit",
  "hostname": "example.com"
}
```

- **Fields explanation**
  - **score**: ranges from 0.0 (likely bot) to 1.0 (likely human)
  - **action**: should match the action you defined in execute()
  - **success**: indicates whether the token was valid
