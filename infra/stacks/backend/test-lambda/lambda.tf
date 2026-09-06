module "lambda" {
  source          = "../../../modules/backend/lambda/function"
  env_name        = var.env_name
  lambda_name     = "hello-world"
  lambda_zip_path = "${path.root}/../../../backend/dist/hello-world.zip"
  handler         = "index.handler"
  role_arn        = ""
  description     = "test"
}
