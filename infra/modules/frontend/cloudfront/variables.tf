variable "bucket_regional_domain_name" {
  description = "Regional domain name of the S3 bucket"
  type        = string
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "certificate_arn" {
  type = string
}

variable "domain_name" {
  description = "Custom domain name"
  type        = string
}

variable "www_domain_name" {
  description = "WWW subdomain name for frontend"
  type        = string
}

variable "env_name" {
  description = "Environment name used for resource naming (e.g., dev, prod)"
  type        = string
}
