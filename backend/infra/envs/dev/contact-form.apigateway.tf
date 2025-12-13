module "contact_form_api_gateway" {
  source            = "../../modules/apigateway"
  env_name          = "dev"
  lambda_name       = module.contact_form_lambda.lambda_name
  lambda_invoke_arn = module.contact_form_lambda.lambda_arn
  allow_origins     = ["http://localhost:9000"]
}