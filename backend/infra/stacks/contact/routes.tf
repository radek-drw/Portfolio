module "send_email_route" {
  source            = "../../modules/apigateway/route"
  api_id            = module.api.api_id
  execution_arn     = module.api.execution_arn
  route_key         = "POST /contact"
  lambda_name       = module.send_email_lambda.name
  lambda_invoke_arn = module.send_email_lambda.invoke_arn
}