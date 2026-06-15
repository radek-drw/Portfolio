module "backend" {
  source = "../../modules/backend"

  aws_region    = "eu-west-1"
  env_name      = "prod"
  allow_origins = ["https://www.radek-drweski.com", "https://radek-drweski.com"]
}