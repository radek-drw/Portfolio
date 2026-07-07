locals {
  env_name      = "dev"
  aws_region    = "eu-west-1"
  allow_origins = ["http://localhost:9000"]
  branch_name    = "dev"
  bucket_name    = "dev-portfolio-static-site"
  tags = {
    Environment = "dev"
    Project     = "portfolio"
    ManagedBy   = "Terraform"
  }
  project_name = "portfolio"
}