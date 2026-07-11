module "api" {
  source = "../../stacks/api"

  env_name      = local.env_name
  allow_origins = local.allow_origins
}

module "contact_form" {
  source = "../../stacks/contact-form"

  env_name      = local.env_name
  api_id        = module.api.api_id
  execution_arn = module.api.execution_arn
  api_url       = module.api.api_url
}

module "frontend" {
  source = "../../stacks/frontend"

  frontend_bucket_name = local.frontend_bucket_name
  tags                 = local.tags
  project_name         = local.project_name
  domain_name          = local.domain_name
}