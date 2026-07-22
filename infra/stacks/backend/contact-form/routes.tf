module "send_email_route" {
  source            = "../../../modules/backend/apigateway/route"
  api_id            = var.api_id
  execution_arn     = var.execution_arn
  route_key         = "POST /contact"
  lambda_name       = module.send_email_lambda.name
  lambda_invoke_arn = module.send_email_lambda.invoke_arn
}