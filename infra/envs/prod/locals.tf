locals {
  env_name             = "prod"
  git_branch           = "main"
  allow_origins        = ["https://radek-drweski.com", "https://www.radek-drweski.com"]
  frontend_bucket_name = "prod-portfolio-static-site"
  project_name         = "portfolio"
  domain_name          = "radek-drweski.com"
  www_domain_name      = "www.radek-drweski.com"
  hosted_zone_name     = "radek-drweski.com"
  tags = {
    Environment = "prod"
    Project     = "portfolio"
    ManagedBy   = "Terraform"
  }
}
