output "name" {
  description = "Lambda function name"
  value       = aws_lambda_function.lambda.function_name
}

output "invoke_arn" {
  description = "Lambda function invoke ARN, used for API Gateway integrations"
  value       = aws_lambda_function.lambda.invoke_arn
}
