output "api_url" {
  description = "Deployed API Gateway URL"
  value       = "${aws_apigatewayv2_api.contact_api.api_endpoint}/${aws_apigatewayv2_stage.stage.name}"
}