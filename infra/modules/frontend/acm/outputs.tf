output "certificate_arn" {
  description = "ARN of ACM certificate"

  value = aws_acm_certificate.this.arn
}

output "domain_validation_options" {
  description = "DNS validation records"

  value = aws_acm_certificate.this.domain_validation_options
}