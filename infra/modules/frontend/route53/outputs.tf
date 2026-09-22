output "validation_record_fqdns" {
  value = [
    for record in aws_route53_record.certificate_validation :
    record.fqdn
  ]
}

output "hosted_zone_id" {
  description = "Route 53 hosted zone ID"
  value       = data.aws_route53_zone.this.zone_id
}
