## Local Backend Functions Testing

Local backend testing allows verifying Lambda logic before deployment to AWS. It minimizes AWS costs and time during development

**Advantages**:

- **fast:** runs instantly, no deployment needed for every change
- **easy to debug:** full access to console logs or use breakpoints

### Backend functions:

1. **sendContactForm.js**
   - Script in: `backend/package.json`
   - Run script:
     ```bash
     npm run invoke:sendContactForm
     ```
   - Handler: `backend/src/sendContactForm.js`

   - Purpose:
     - tests backend logic only: validation, SES email sending
     - minimal AWS usage: API Gateway and Lambda aren’t invoked; SES is invoked
     - reCAPTCHA is skipped locally by setting `RECAPTCHA_BYPASS=true` in `.env` (for testing without Google calls). This variable isn’t set in production — AWS Lambda uses its own environment variables, so the bypass doesn’t apply in the cloud

> **Note:** Full integration tests (API Gateway, IAM, reCAPTCHA, Lambda, SES) are described in `infra/envs/dev`
