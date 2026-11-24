# GitHub Actions Workflows

This directory contains GitHub Actions workflows responsible for automating code quality checks, builds, deployments, and other CI/CD processes.

## Workflows

### 1. Frontend Deployment (DEV / PROD)

**Purpose:** Builds and deploys the frontend application to the selected environment

**Triggers:**

- Push to the `dev` or `main` branch when frontend files are changed (excluding Markdown files)
- Manual execution via `workflow_dispatch`

**What it does:**

1. Runs code quality checks using ESLint and Prettier
2. Builds the frontend application
3. Authenticates with AWS using OIDC and an environment-specific IAM Role, providing temporary credentials
4. Deploys the build to the corresponding AWS S3 bucket
5. Invalidates the corresponding CloudFront cache to make the latest changes available

**Deployment dependency:** Deployment starts only after the code quality checks pass. If they fail, the deployment is skipped.

**Additional configuration:** The PROD deployment uses the GitHub `production` environment, which requires manual approval before deploying changes to S3 and CloudFront. This adds an extra safeguard for the main branch

### 2. Terraform Deployment (DEV / PROD)

**Purpose**: Validates and deploys infrastructure changes to the selected AWS environment using Terraform

**Triggers**:

- Push to the `dev` or `main` branch when relevant infrastructure or backend files are changed
- Manual execution via `workflow_dispatch`

**What it does:**

- Checks Terraform formatting, validates the configuration, and runs TFLint
- Runs ESLint and Prettier checks on JavaScript-related files
- Builds Lambda functions (required by Terraform on every fresh runner, even when Lambda code is unchanged)
- Authenticates with AWS using OIDC and an environment-specific IAM Role, providing temporary credentials
- Deploys infrastructure changes using Terraform

**Deployment dependency:** Terraform deployment starts only after both `terraform-quality-check` and ` code-quality-check` pass

**Environment differences:**

- **DEV**: Runs terraform apply -auto-approve directly after all checks pass
- **PROD**: First generates a Terraform plan and saves it as a GitHub Actions artifact. After manual approval, Terraform applies the previously generated plan

**Additional configuration:** The PROD deployment uses the GitHub `production` environment, which requires manual approval before applying infrastructure changes. This adds an extra safeguard for the AWS production environment
