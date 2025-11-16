## Local Backend Functions Testing

Local backend testing allows verifying Lambda logic before deployment to AWS. It minimizes AWS costs and time during development

**Advantages**:

- **fast:** runs instantly, no deployment needed for every change
- **easy to debug:** full access to console logs or use breakpoints

### Backend functions:

1. `sendContactForm`

   **Script**:

   ```bash
   npm run invoke:sendContactForm
   ```

   **Location**: `backend/package.json`

   **Handler**: `backend/src/sendContactForm.js`

   **Purpose**:
   - tests backend logic only: validation, SES email sending
   - minimal AWS usage: API Gateway and Lambda aren’t invoked; SES is invoked
   - requires valid AWS credentials `(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)` to send emails via SES
   - reCAPTCHA is skipped locally by setting `RECAPTCHA_BYPASS=true` in `.env` (for testing without Google calls). This variable isn’t set in production — AWS Lambda uses its own environment variables, so the bypass doesn’t apply in the cloud

> **Note:** Full integration tests (API Gateway, IAM, reCAPTCHA, Lambda, SES) are described in `infra/envs/dev`
