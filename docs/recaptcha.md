# How Google reCAPTCHA v3 Works

### Frontend

1. **Load the reCAPTCHA Script** in <head> of HTML
      <script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>

   This script activates passive tracking of user behavior (mouse movements, clicks, scrolling, etc.).

2. **Generate a Token**
   When the user clicks the "Submit" button, the following function is triggered:
   `const token = await grecaptcha.execute('YOUR_SITE_KEY', { action: 'submit' });`
   This sends collected behavioral data to Google, which returns a token — a secure, encrypted string summarizing the session.

3. **Send the Token to the Backend**
   The token is added to the form data and sent to the server for verification.

### Backend

1. **Verify the Token**
   The server sends a POST request to:
   https://www.google.com/recaptcha/api/siteverify
   using the token received from the frontend and the secret key stored in environment variables

2. **Receive Google's Response**
   Google verifies the token and responds with a JSON object, for example:
   {
   "success": true,
   "score": 0.9,
   "action": "submit",
   "hostname": "example.com"
   }

- score: ranges from 0.0 (likely bot) to 1.0 (likely human)
- action: should match the action you defined in execute()
- success: indicates whether the token was valid
