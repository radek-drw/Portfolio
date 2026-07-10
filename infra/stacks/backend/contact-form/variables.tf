variable "env_name" {
  description = "Environment name (dev, prod)"
  type        = string
}

variable "api_id" {
  description = "API Gateway ID from api stack"
  type        = string
}

variable "execution_arn" {
  description = "API Gateway execution ARN from api stack"
  type        = string
}

variable "api_url" {
  description = "API Gateway endpoint URL from api stack"
  type        = string
}