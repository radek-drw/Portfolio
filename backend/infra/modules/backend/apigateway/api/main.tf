resource "aws_apigatewayv2_api" "this" {
  name          = "${var.env_name}-portfolio-api"
  protocol_type = "HTTP"
  description   = var.description

  cors_configuration {
    allow_origins = var.allow_origins
    allow_methods = var.allow_methods
    allow_headers = ["content-type"]
  }
}

resource "aws_apigatewayv2_stage" "this" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = var.env_name
  auto_deploy = true
}