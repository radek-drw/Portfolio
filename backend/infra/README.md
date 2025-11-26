⚠️ Before running any Terraform commands in `envs/dev` or `env/prod` directory, make sure the backend (S3 and DynamoDB) is initialized to store state (`terraform.tfstate`) and locks:

- Navigate to `bootstrap/`:

  ```bash
  terraform init
  terraform apply
  ```

  > This will create the remote backend resources in S3 and DynamoDB based on `bootstrap/main.tf`

- Now you can navigate to `envs/dev` or `env/prod` and run:
  ```bash
  terraform init
  ```
