resource "aws_lambda_function" "this" {
  function_name = "${var.env_name}-${var.lambda_name}-lambda"
  description   = var.description
  handler       = var.handler
  runtime       = var.runtime
  timeout       = var.timeout
  role          = var.role_arn
  s3_bucket     = var.lambda_artifacts_bucket_name
  s3_key        = var.lambda_s3_key

  environment {
    variables = var.environment_variables
  }
}
