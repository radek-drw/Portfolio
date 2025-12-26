output "name" {
  value       = aws_lambda_function.lambda.function_name
  description = "Lambda function name"
}

output "invoke_arn" {
  value       = aws_lambda_function.lambda.invoke_arn
  description = "Invoke ARN of the Lambda function"
}
