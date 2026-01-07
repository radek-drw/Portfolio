## Local Lambda Testing Flow

- Lambda backend can be tested locally before deploying it to AWS
- A test script calls the handler with a sample event
- The Lambda function processes the event as it would in production (validation, email sending, etc.).
- The response includes statusCode and body, which can be inspected in the console.
- This helps catch errors early, saving time and cloud costs
- Benefits: saves build time, reduces cloud usage costs, and ensures backend logic works as expected before integration with the frontend.

## Cache DOM elements

All required form elements are selected and stored in variables once on DOMContentLoaded. This approach:

- avoids repeated calls to `document.getElementById` / `querySelector` during validation and error handling
- improves performance by reducing DOM lookups
- keeps the code shorter, cleaner, and easier to maintain

## to do

1. add locks i dynamodb for terraform state and add s3 versioning
2. **terraform** write documentation about adding, removing, editing, reading secrets in AWS SSM

```bash
 `aws ssm put-parameter \
  --name recaptcha_secret \
  --value some_value \
  --type SecureString \
  --description ReCAPTCHA secret key for contact form`
```

```bash
 `aws ssm put-parameter \
 --name ses_from_address \
 --value some_value \
 --type SecureString \
 --description Email address used as 'From' in the contact form`
```

## SECURITY

This project helps prevent accidental exposure of sensitive information in source code, including API keys, passwords, access tokens, database credentials, and other secrets

### Security Setup

- **Install Python**  
  Python is required to run ggshield

  ```bash
  winget install Python.Python
  ```

- **Install ggshield**  
  CLI tool that scans staged files for secrets in the `pre-commit` hook, preventing accidental leaks

  ```bash
  pipx install ggshield
  ```

  > **Note**: To use ggshield beyond local scans, a GitGuardian account is needed (`ggshield auth login`)

- **GitGuardian**  
   Is an additional security platform that detects and protects against accidentally exposed secrets across repositories and infrastructure

- change api name to dev-portoflio-api
- .github\workflows\README.md - change descritpion when ci-quality-check finished
