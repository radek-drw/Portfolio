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

## ggshield commands

- `ggshield secret scan repo .` → scans the entire repository, including all files and commit history
- `ggshield secret scan pre-commit` → scans only staged changes (files added to the staging area) before committing
- `ggshield secret scan path ./config.json` → scans a specific file

## SECURITY

This project is designed to prevent sensitive data from being accidentally exposed in the source code, including:

- API keys
- Passwords
- Access tokens
- SSH keys
- Certificates
- Database credentials
- Connection URLs
- - ...and other sensitive information

### Security Setup

**ggshield** (for local repository, in git pre-commit hook)

For scanning secrets in the local repository, the project uses `ggshield` which runs on `Python`

- ggshield install:

  ```bash
  winget install ggshield
  ```

- Python installation:

  ```bash
  winget install python
  ggshield must be installed:
  ```

ggshield is integrated with a pre-commit hook, so any commit containing a secret will be blocked.

To use ggshield, verification with a GitGuardian account is required.

**GitGuardian** (remote repository)
Additionally, the remote repository is monitored by GitGuardian, which scans the repository for potential secret leaks.
