module "api" {
  source        = "../../stacks/api"

  env_name      = local.env_name
  allow_origins = local.allow_origins
}

module "contact" {
  source        = "../../stacks/contact"

  aws_region    = local.aws_region
  env_name      = local.env_name
}