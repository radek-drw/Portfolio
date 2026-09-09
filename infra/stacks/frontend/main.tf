module "s3" {
  source = "../../modules/frontend/s3"

  bucket_name = var.frontend_bucket_name
  tags        = var.tags
}

module "acm" {
  source = "../../modules/frontend/acm"
  domain_name = var.domain_name
  providers = {
    aws = aws.us_east_1
  }
}

module "cloudfront" {
  source = "../../modules/frontend/cloudfront"

  bucket_regional_domain_name = module.s3.bucket_regional_domain_name
  project_name                = var.project_name
  tags                        = var.tags
  certificate_arn             = module.acm.certificate_arn
  domain_name                 = var.domain_name
}

module "route53" {
  source = "../../modules/frontend/route53"

  hosted_zone_name          = var.hosted_zone_name
  domain_name               = var.domain_name
  distribution_domain_name  = module.cloudfront.distribution_domain_name
  distribution_zone_id      = module.cloudfront.distribution_zone_id
  domain_validation_options = module.acm.domain_validation_options
  certificate_arn           = module.acm.certificate_arn
}

module "acm_validation" {
  source = "../../modules/frontend/acm-validation"

  providers = {
    aws = aws.us_east_1
  }
  certificate_arn = module.acm.certificate_arn
  validation_record_fqdns = module.route53.validation_record_fqdns
}