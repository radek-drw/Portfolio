locals {
  env_name      = "dev"
  allow_origins = ["http://localhost:9000"]
  branch_name   = "dev"
  bucket_name   = "dev-portfolio-static-site"
  project_name  = "portfolio"
  domain_name   = "dev.radek-drweski.com"
  tags = {
    Environment = "dev"
    Project     = "portfolio"
    ManagedBy   = "Terraform"
  }

}