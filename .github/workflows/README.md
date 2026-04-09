## GitHub Actions Workflows

This project uses automated CI/CD pipelines for backend and frontend.

1. **Pull Request** - main (Production validation)

   Triggered when a PR targets main.

   It:
   - runs ESLint and Prettier checks
   - builds the frontend
   - runs Terraform plan for production

   Purpose: Ensure production changes are safe, valid, and buildable before merge.

2. **Push** - dev (Development environment)

   Triggered on every push to dev.

   It:
   - runs lint and formatting checks
   - builds the frontend
   - deploys backend infrastructure to dev using Terraform

   Purpose: Continuous integration and automatic deployment to development environment.

3. **Push** - main (Production deployment)

   Triggered after merge to main.

   It:
   - runs Terraform apply for production
   - requires manual approval via GitHub environments

   Purpose: Controlled production deployment
