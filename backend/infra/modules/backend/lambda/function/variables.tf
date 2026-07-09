variable "env_name" {
  description = "Environment name used for resource naming (e.g. dev, prod)"
  type        = string
}

variable "lambda_name" {
  description = "Logical name of the Lambda function"
  type        = string
}

variable "description" {
  description = "Description of the Lambda function"
  type        = string
}

variable "lambda_zip_path" {
  description = "Path to the Lambda deployment ZIP file"
  type        = string
}

variable "handler" {
  description = "Lambda function entrypoint handler"
  type        = string
  default     = "index.handler"
}

variable "runtime" {
  description = "Runtime environment for the Lambda function"
  type        = string
  default     = "nodejs22.x"
}

variable "timeout" {
  description = "Maximum execution time of the Lambda function in seconds"
  type        = number
  default     = 3
}

variable "role_arn" {
  description = "IAM role ARN assumed by the Lambda function"
  type        = string
}

variable "environment_variables" {
  description = "Environment variables passed to the Lambda function"
  type        = map(string)
  default     = {}
}
