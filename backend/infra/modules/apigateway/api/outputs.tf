output "api_id" {
  value       = aws_apigatewayv2_api.api.id
  description = "API Gateway ID used for route creation and integrations"
}

output "execution_arn" {
  value       = aws_apigatewayv2_api.api.execution_arn
  description = "Execution ARN used for Lambda permissions and integrations"
}

output "api_url" {
  value       = "${aws_apigatewayv2_api.api.api_endpoint}/${aws_apigatewayv2_stage.stage.name}"
  description = "Base API URL including stage, used by frontend clients"
}
