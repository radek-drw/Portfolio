output "api_url" {
  description = "API Gateway endpoint URL"
  value       = "${module.api.api_url}/contact"
}