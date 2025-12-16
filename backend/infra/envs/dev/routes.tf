module "contact_route" {
  source            = "../../modules/apigateway/api_route"
  api_id            = module.api.api_id
  execution_arn     = module.api.execution_arn
  route_key         = "POST /contact"
  lambda_name       = module.contact_lambda.name
  lambda_invoke_arn = module.contact_lambda.invoke_arn
}