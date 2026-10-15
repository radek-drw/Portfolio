resource "aws_apigatewayv2_integration" "this" {
  api_id                 = var.api_id
  integration_type       = "AWS_PROXY"
  integration_uri        = var.lambda_invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "this" {
  api_id    = var.api_id
  route_key = var.route_key
  target    = "integrations/${aws_apigatewayv2_integration.this.id}"
}

resource "aws_lambda_permission" "this" {
  statement_id  = "AllowAPIGatewayInvoke-${replace(replace(var.route_key, " ", "-"), "/", "-")}"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.execution_arn}/*/*"
}
