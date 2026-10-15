module "api" {
  description   = "API Gateway for ${var.env_name} environment"
  source        = "../../../modules/backend/apigateway/api"
  env_name      = var.env_name
  allow_origins = var.allow_origins
  allow_methods = ["OPTIONS", "POST"]
}