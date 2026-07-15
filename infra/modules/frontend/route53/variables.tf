variable "hosted_zone_name" {
  description = "Hosted Zone name"
  type        = string
}

variable "domain_name" {
  description = "Domain name to create Route53 alias record for"
  type        = string
}

variable "distribution_domain_name" {
  description = "CloudFront distribution domain name"
  type        = string
}

variable "distribution_zone_id" {
  description = "CloudFront distribution hosted zone ID"
  type        = string
}

variable "domain_validation_options" {
  description = "ACM domain validation options"
  type        = any
}