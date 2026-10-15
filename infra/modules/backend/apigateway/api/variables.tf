variable "env_name" {
  description = "Environment name for resource naming and API stage (e.g. dev, prod)"
  type        = string
}

variable "allow_origins" {
  description = "Allowed CORS origins for the HTTP API"
  type        = list(string)
}

variable "description" {
  description = "Description of the API Gateway HTTP API"
  type        = string
}

variable "allow_methods" {
  description = "Allowed HTTP methods for CORS configuration"
  type        = list(string)
  default     = ["OPTIONS"]
}
