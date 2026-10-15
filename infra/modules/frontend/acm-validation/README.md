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

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_certificate_arn"></a> [certificate\_arn](#input\_certificate\_arn) | ARN of ACM certificate | `string` | n/a | yes |
| <a name="input_validation_record_fqdns"></a> [validation\_record\_fqdns](#input\_validation\_record\_fqdns) | DNS validation record FQDNs | `list(string)` | n/a | yes |

## Outputs

No outputs.
<!-- END_TF_DOCS -->