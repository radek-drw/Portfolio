# Infrastructure

This directory contains the Terraform infrastructure for the project

### Structure

- `bootstrap/` - creates the infrastructure required for Terraform, including the remote state backend and the account-level GitHub Actions OIDC provider
- `envs/dev/` - development environment
- `envs/prod/` - production environment
- `modules/` - reusable Terraform modules used by the infrastructure stacks
- `stacks/` - groups reusable modules into complete infrastructure components, such as the frontend and backend

### Deployment order

⚠️ The `bootstrap` infrastructure must be created first. Once the remote state backend is configured, the `dev` and `prod` environments can be deployed separately

See `bootstrap/README.md` for the bootstrap setup
