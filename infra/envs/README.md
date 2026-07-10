# Environment switch checklist (DEV → PROD)

When copying infrastructure from `dev` to `prod`, remember to update the following files:

- **API Gateway CORS** (`api.tf`)  
  Update `allowed_origins` from `localhost` to production domains:

  ```bash
  allow_origins = [
  "https://my-domain.com",
  "https://www.my-domain.com"
  ]
  ```

- **Terraform backend (state)** (`backend.tf`)  
  Make sure the backend state is set to `prod`:

  ```bash
  key = "prod/terraform.tfstate"
  ```

- **Environment variables** (`terraform.tfvars`)  
  Switch environment variables to production:
  ```bash
  env_name = "prod"
  ```
