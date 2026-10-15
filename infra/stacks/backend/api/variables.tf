variable "env_name" {
  description = "Environment name (dev, prod)"
  type        = string
}

variable "allow_origins" {
  description = "List of allowed CORS origins for API Gateway"
  type        = list(string)
}