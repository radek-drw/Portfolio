module "backend" {
  source = "../../modules/backend"

  aws_region    = "eu-west-1"
  env_name      = "dev"
  allow_origins = ["http://localhost:9000"]
}