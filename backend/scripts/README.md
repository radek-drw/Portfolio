## **invoke-contact-form.local.js**

This script enables local backend testing of `contact-form.js`. It allows verifying Lambda logic before deployment to AWS.

**Advantages**

- fast to run, no need to redeploy after every change
- easy to debug with full access to console logs and breakpoints
- reduces development time and AWS costs

**Usage**

- script in: `backend/package.json`
- run script:
  ```bash
  npm run invoke:contact-form
  ```
- handler: `backend/src/contact-form.js`

**Purpose**

- tests backend logic only: validation, SES email sending
- minimal AWS usage: API Gateway and Lambda aren’t invoked; SES is invoked
- locally, reCAPTCHA is skipped via `RECAPTCHA_BYPASS=true` in `.env`.
  In AWS Lambda the variable is not set, so the bypass resolves to `false` and reCAPTCHA verification is always executed

> **Note:** Full integration tests (API Gateway, IAM, reCAPTCHA, Lambda, SES) are described in `infra/envs/dev`

## build-lambda.js

This script builds and packages an AWS Lambda function into a ZIP ready for deployment.

**Key features**

- bundles the Lambda function with `esbuild` (minified)
- bundles dependencies, excluding `aws-sdk` already available in Lambda
- produces a ZIP ready to upload to AWS (deployed via Terraform)

**Usage**

- script in `backend/package.json`
- run script:
  ```bash
  npm run build:lambda <function-name>
  ```
- source file (handler): `backend/src/<functionName>.js`
- output ZIP: `backend/dist/<functionName>.zip`
