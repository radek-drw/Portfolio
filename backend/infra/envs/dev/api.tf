module "api" {
  source        = "../../modules/apigateway/api"
  env_name      = "dev"
  allow_origins = ["http://localhost:9000"]
  allow_methods = ["OPTIONS", "POST"]
}