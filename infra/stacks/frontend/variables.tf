variable "frontend_bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "tags" {
  description = "Tags to apply to the bucket"
  type        = map(string)
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