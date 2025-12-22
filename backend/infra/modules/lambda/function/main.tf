resource "aws_lambda_function" "lambda" {
  function_name    = "${var.env_name}-${var.lambda_name}-lambda"
  description      = var.description
  handler          = var.handler
  runtime          = var.runtime
  timeout          = var.timeout
  role             = var.role_arn
  filename         = var.lambda_zip_path
  source_code_hash = filebase64sha256(var.lambda_zip_path)

  environment {
    variables = var.environment_variables
  }
}
