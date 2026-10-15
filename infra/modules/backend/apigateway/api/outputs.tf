output "api_id" {
  description = "API Gateway ID used for route creation and integrations"
  value       = aws_apigatewayv2_api.this.id
}

output "execution_arn" {
  description = "Execution ARN used for Lambda permissions and integrations"
  value       = aws_apigatewayv2_api.this.execution_arn
}

output "api_url" {
  description = "Full API URL with stage, for frontend use"
  value       = "${aws_apigatewayv2_api.this.api_endpoint}/${aws_apigatewayv2_stage.this.name}"

}
