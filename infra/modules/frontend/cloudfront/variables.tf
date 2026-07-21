variable "bucket_regional_domain_name" {
  description = "Regional domain name of the S3 bucket"
  type        = string
}

variable "tags" {
  description = "Tags applied to the distribution"
  type        = map(string)
  default     = {}
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