variable "certificate_arn" {
  description = "ARN of ACM certificate"
  type        = string
}

variable "validation_record_fqdns" {
  description = "DNS validation record FQDNs"
  type        = list(string)
}