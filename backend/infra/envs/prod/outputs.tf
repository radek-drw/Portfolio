output "api_url" {
  description = "Final URL of the deployed API Gateway (prod)"
  value       = module.apigateway.api_url
}