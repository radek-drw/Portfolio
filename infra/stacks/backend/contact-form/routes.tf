module "route" {
  source            = "../../../modules/backend/apigateway/route"
  api_id            = var.api_id
  execution_arn     = var.execution_arn
  route_key         = "POST /contact"
  lambda_name       = module.lambda.lambda_name
  lambda_invoke_arn = module.lambda.invoke_arn
}