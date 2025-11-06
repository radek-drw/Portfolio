variable "api_path" {
  default = "contact"
}

output "api_url" {
  description = "Full API endpoint"
  value       = "${aws_apigatewayv2_api.contact_api.api_endpoint}/${aws_apigatewayv2_stage.stage.name}/${var.api_path}"
}
