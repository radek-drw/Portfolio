locals {
  env_name                     = "dev"
  git_branch                   = "dev"
  allow_origins                = ["http://localhost:9000", "https://dev.radek-drweski.com"]
  frontend_bucket_name         = "dev-portfolio-static-site"
  lambda_artifacts_bucket_name = "radek-portfolio-lambda-artifacts"
  project_name                 = "portfolio"
  domain_name                  = "dev.radek-drweski.com"
  hosted_zone_name             = "radek-drweski.com"
  tags = {
    Environment = "dev"
    Project     = "portfolio"
    ManagedBy   = "Terraform"
  }
}
