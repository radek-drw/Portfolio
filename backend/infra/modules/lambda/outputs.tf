output "lambda_arn" {
  description = "ARN Lambda function, used by API Gateway integration"
  value       = aws_lambda_function.contact_form.arn
}

output "lambda_name" {
  description = "Name of the Lambda function, used by permission setup"
  value       = aws_lambda_function.contact_form.function_name
}