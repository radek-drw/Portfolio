# ⚠️ WARNING: This backend assumes that the S3 bucket and DynamoDB table already exist.
# If creating a new project, first go to the `backend-setup/` folder
# and run `terraform init && terraform apply`.

terraform {
  backend "s3" {
    bucket         = "radek-portfolio-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-locks-table"
    encrypt        = true
  }
}
