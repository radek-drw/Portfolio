data "aws_route53_zone" "this" {
  name         = var.hosted_zone_name
  private_zone = false
}

resource "aws_route53_record" "certificate_validation" {
  for_each = {
    for dvo in var.domain_validation_options :
    dvo.domain_name => dvo
  }

  allow_overwrite = true
  zone_id         = data.aws_route53_zone.this.zone_id
  name            = each.value.resource_record_name
  type            = each.value.resource_record_type
  records         = [each.value.resource_record_value]
  ttl             = 60
}

resource "aws_acm_certificate_validation" "this" {
  certificate_arn = var.certificate_arn

  validation_record_fqdns = [
    for record in aws_route53_record.certificate_validation :
    record.fqdn
  ]
}

resource "aws_route53_record" "alias_a" {
  zone_id = data.aws_route53_zone.this.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = var.distribution_domain_name
    zone_id                = var.distribution_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "alias_aaaa" {
  zone_id = data.aws_route53_zone.this.zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = var.distribution_domain_name
    zone_id                = var.distribution_zone_id
    evaluate_target_health = true
  }
}