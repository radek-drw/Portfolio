variable "env_name" {
  description = "Environment name (dev, prod)"
  type        = string
}

variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
}

variable "allow_origins" {
  description = "List of allowed CORS origins for API Gateway"
  type        = list(string)
}