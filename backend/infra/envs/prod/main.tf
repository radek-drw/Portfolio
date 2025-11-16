provider "aws" {
  region = "eu-west-1"
}

module "lambda" {
  source           = "../../modules/lambda"
  env_name         = "prod"
  lambda_zip_path  = "../../../dist/sendContactForm.zip"
  recaptcha_secret = "prod-secret"
  ses_from_address = "rdrweski@outlook.com"
}

module "apigateway" {
  source            = "../../modules/apigateway"
  env_name          = "prod"
  lambda_invoke_arn = module.lambda.lambda_arn
  lambda_name       = "${module.lambda.lambda_arn}"
  allow_origins     = ["https://radek-drweski.com"]
}