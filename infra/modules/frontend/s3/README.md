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
| [aws_s3_bucket.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_frontend_bucket_name"></a> [frontend\_bucket\_name](#input\_frontend\_bucket\_name) | S3 bucket containing frontend static files and assets | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_bucket_arn"></a> [bucket\_arn](#output\_bucket\_arn) | ARN of the S3 bucket |
| <a name="output_bucket_id"></a> [bucket\_id](#output\_bucket\_id) | Bucket ID |
| <a name="output_bucket_name"></a> [bucket\_name](#output\_bucket\_name) | Bucket name |
| <a name="output_bucket_regional_domain_name"></a> [bucket\_regional\_domain\_name](#output\_bucket\_regional\_domain\_name) | Regional domain name of the bucket |
<!-- END_TF_DOCS -->