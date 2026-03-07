variable "env_name" {
  description = "Environment name used for resource naming (e.g., dev, prod)"
  type        = string
}

variable "lambda_name" {
  description = "Base name of the Lambda function used for naming role and policy"
  type        = string
}

variable "policy_description" {
  description = "Description of the IAM policy"
  type        = string
}

variable "policy_document" {
  description = "JSON document defining the IAM policy statements"
  type        = any
}
