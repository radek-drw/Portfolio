output "role_arn" {
  description = "ARN of the IAM role for the Lambda function"
  value       = aws_iam_role.role.arn
}
