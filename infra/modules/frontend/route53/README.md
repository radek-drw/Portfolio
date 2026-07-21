<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | n/a |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_acm_certificate_validation.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate_validation) | resource |
| [aws_route53_record.alias_a](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record) | resource |
| [aws_route53_record.alias_aaaa](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record) | resource |
| [aws_route53_record.certificate_validation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record) | resource |
| [aws_route53_zone.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/route53_zone) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_certificate_arn"></a> [certificate\_arn](#input\_certificate\_arn) | ARN of ACM certificate | `string` | n/a | yes |
| <a name="input_distribution_domain_name"></a> [distribution\_domain\_name](#input\_distribution\_domain\_name) | CloudFront distribution domain name | `string` | n/a | yes |
| <a name="input_distribution_zone_id"></a> [distribution\_zone\_id](#input\_distribution\_zone\_id) | CloudFront distribution hosted zone ID | `string` | n/a | yes |
| <a name="input_domain_name"></a> [domain\_name](#input\_domain\_name) | Domain name to create Route53 alias record for | `string` | n/a | yes |
| <a name="input_domain_validation_options"></a> [domain\_validation\_options](#input\_domain\_validation\_options) | ACM domain validation options | `any` | n/a | yes |
| <a name="input_hosted_zone_name"></a> [hosted\_zone\_name](#input\_hosted\_zone\_name) | Hosted Zone name | `string` | n/a | yes |

## Outputs

No outputs.
<!-- END_TF_DOCS -->