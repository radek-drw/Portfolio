## Local Lambda Testing

Script `run-sendContactForm.js` tests Lambda logic locally without deploying to AWS.

**Purpose:**

- tests backend logic only: validation, email sending, database updates, etc.
- does not test integration with API Gateway, IAM, or reCAPTCHA
- full integration tests (including real reCAPTCHA tokens) are described in terraform/envs/dev

**Advantages:**

- fast: runs instantly in Node.js, no deployment needed
- cost-free: no AWS usage while testing
- easy debugging: inspect console.log() output or use breakpoints
- flexible: simulate different request payloads, missing fields, or errors

How to run

```bash
node scripts/run-sendContactForm.js
```
