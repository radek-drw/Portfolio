output "api_id" {
  description = "API Gateway ID"
  value       = module.api.api_id
}

output "execution_arn" {
  description = "API Gateway execution ARN"
  value       = module.api.execution_arn
}

output "api_url" {
  description = "API Gateway endpoint URL"
  value       = module.api.api_url
}
