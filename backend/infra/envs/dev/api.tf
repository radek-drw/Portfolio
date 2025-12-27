module "api" {
  description   = "API Gateway for ${var.env_name} environment"
  source        = "../../modules/apigateway/api"
  env_name      = var.env_name
  allow_origins = ["http://localhost:9000"]
  allow_methods = ["OPTIONS", "POST"]
}