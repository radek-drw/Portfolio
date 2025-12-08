## **invoke-sendContactForm.local.js**

This script enables local backend testing of `sendContactForm.js`. It allows verifying Lambda logic before deployment to AWS.

**Advantages**:

- fast to run, no need to redeploy after every change
- easy to debug with full access to console logs and breakpoints
- reduces development time and AWS costs

**Function details**

- script in: `backend/package.json`
- run script:
  ```bash
  npm run invoke:sendContactForm
  ```
- handler: `backend/src/sendContactForm.js`

- Purpose:
  - tests backend logic only: validation, SES email sending
  - minimal AWS usage: API Gateway and Lambda aren’t invoked; SES is invoked
  - reCAPTCHA is skipped locally by setting `RECAPTCHA_BYPASS=true` in `.env` (for testing without Google calls). This variable isn’t set in production — AWS Lambda uses its own environment variables, so the bypass doesn’t apply in the cloud

> **Note:** Full integration tests (API Gateway, IAM, reCAPTCHA, Lambda, SES) are described in `infra/envs/dev`
