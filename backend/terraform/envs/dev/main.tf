provider "aws" {
  region = "eu-west-1"
}

module "lambda" {
  source           = "../../modules/lambda"
  env_name         = "dev"
  lambda_zip_path  = "../../../dist/sendContactForm.zip"
}

module "apigateway" {
  source            = "../../modules/apigateway"
  env_name          = "dev"
  lambda_invoke_arn = module.lambda.lambda_arn
  lambda_name       = "${module.lambda.lambda_arn}"
  allow_origins     = ["http://localhost:9000"]
}