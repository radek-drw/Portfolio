resource "aws_apigatewayv2_api" "api" {
  name          = "${var.env_name}-myapp-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = var.allow_origins
    allow_methods = var.allow_methods
    allow_headers = ["content-type"]
  }
}

resource "aws_apigatewayv2_stage" "stage" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = var.env_name
  auto_deploy = true
}

output "api_id" {
  value = aws_apigatewayv2_api.api.id
}

output "execution_arn" {
  value = aws_apigatewayv2_api.api.execution_arn
}
