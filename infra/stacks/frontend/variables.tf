variable "frontend_bucket_name" {
  description = "S3 bucket containing frontend static files and assets"
  type        = string
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "domain_name" {
  description = "Domain name for frontend"
  type        = string
}

variable "hosted_zone_name" {
  description = "Route53 hosted zone name"
  type        = string
}

variable "env_name" {
  description = "Environment name used for resource naming (e.g., dev, prod)"
  type        = string
}
