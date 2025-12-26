module "api" {
  source        = "../../modules/apigateway/api"
  env_name      = var.env_name
  allow_origins = ["https://www.radek-drweski.com", "https://radek-drweski.com"]
  allow_methods = ["OPTIONS", "POST"]
  description   = "API Gateway for ${var.env_name} environment"
}