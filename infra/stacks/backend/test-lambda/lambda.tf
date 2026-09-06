module "lambda" {
  source          = "../../../modules/backend/lambda/function"
  env_name        = var.env_name
  lambda_name     = "test-lambda"
  lambda_zip_path = "${path.root}/../../../backend/dist/test-lambda.zip"
  handler         = "index.handler"
  role_arn        = ""
  description     = "test"
}
