output "contact_api_url" {
  description = "Endpoint used by the frontend to submit contact form data"
  value       = "${var.api_url}/contact"
}

output "lambda_arn" {
  description = "ARN of the Lambda function"
  value       = module.lambda.arn
}