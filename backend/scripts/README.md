# Backend Scripts — What they do & How to use them

## build-lambda.js

Builds and packages all AWS Lambda functions from `backend/src/` into individual ZIP files ready for deployment

**Features**

- automatically discovers all `.js` Lambda entry files
- bundles and minifies code with `esbuild`
- creates individual ZIP files in `backend/dist/` ready to upload to AWS
- measures the build time of each Lambda and the complete build to monitor build performance in GitHub Actions. Currently, the project is small enough that building all Lambdas takes only ~1 second, so there is no need to add script to detect which Lambda has changed. If the number of Lambdas grows and the build time becomes significant, the timing will help determine when it is worth developing a script to detect which Lambda has changed and build only that one

**Usage**

Run from the `backend/` directory:

```bash
pnpm build:lambda
```

Output ZIP: `backend/dist/<functionName>.zip`

## invoke-send-email.local.js

Locally invokes the Lambda handler to test backend logic before deployment to AWS

**Features**

- tests validation and email sending locally
- skips API Gateway and Lambda invocation; SES is still used

**Usage**

Run from the `backend/` directory:

```bash
pnpm invoke:send-email
```

> **Note** when testing locally, reCAPTCHA is skipped via `RECAPTCHA_BYPASS=true` in `.env`.
> In AWS Lambda the variable is not set, so the bypass resolves to `false` and reCAPTCHA verification is always executed
