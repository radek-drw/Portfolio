## Bootstrap

⚠️ Before running Terraform in `envs/dev` or `envs/prod`, the backend infrastructure must be created first.

### 1. Create S3 bucket and DynamoDB table

Navigate to the `bootstrap/` and run:

```bash
terraform init
terraform apply
```

This creates:

- S3 bucket for remote state
- DynamoDB table for state locking
- Other bootstrap resources (OIDC, roles)

### 2. Configure remote backend for storing bootstrap `state`

After `terraform apply`, create file `backend.tf` in `bootstrap/` with the following:

```bash
terraform {
  backend "s3" {
    bucket         = "radek-portfolio-terraform-state"
    key            = "bootstrap/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-locks-table"
    encrypt        = true
  }
}
```

Then run:

```bash
terraform init
```

Confirm migration of local state to S3. From now on, bootstrap uses remote state

### 3. Clean up local files

```bash
rm -rf .terraform terraform.tfstate terraform.tfstate.backup
```

### 4. Continue with dev/prod

Terraform commands in envs/dev or envs/prod can now be run normally
