<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >= 1.6.0 |
| <a name="requirement_aws"></a> [aws](#requirement\_aws) | ~> 6 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | ~> 6 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_lambda_function.lambda](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_description"></a> [description](#input\_description) | Description of the Lambda function | `string` | n/a | yes |
| <a name="input_env_name"></a> [env\_name](#input\_env\_name) | Environment name used for resource naming (e.g. dev, prod) | `string` | n/a | yes |
| <a name="input_environment_variables"></a> [environment\_variables](#input\_environment\_variables) | Environment variables passed to the Lambda function | `map(string)` | `{}` | no |
| <a name="input_handler"></a> [handler](#input\_handler) | Lambda function entrypoint handler | `string` | `"index.handler"` | no |
| <a name="input_lambda_name"></a> [lambda\_name](#input\_lambda\_name) | Logical name of the Lambda function | `string` | n/a | yes |
| <a name="input_lambda_zip_path"></a> [lambda\_zip\_path](#input\_lambda\_zip\_path) | Path to the Lambda deployment ZIP file | `string` | n/a | yes |
| <a name="input_role_arn"></a> [role\_arn](#input\_role\_arn) | IAM role ARN assumed by the Lambda function | `string` | n/a | yes |
| <a name="input_runtime"></a> [runtime](#input\_runtime) | Runtime environment for the Lambda function | `string` | `"nodejs22.x"` | no |
| <a name="input_timeout"></a> [timeout](#input\_timeout) | Maximum execution time of the Lambda function in seconds | `number` | `3` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_invoke_arn"></a> [invoke\_arn](#output\_invoke\_arn) | Lambda function invoke ARN, used for API Gateway integrations |
| <a name="output_name"></a> [name](#output\_name) | Lambda function name |
<!-- END_TF_DOCS -->

## Usage

```hcl
module "contact_form_lambda" {
  source          = "../../modules/lambda/function"
  env_name        = var.env_name
  lambda_name     = local.contact_form_lambda_name
  lambda_zip_path = "../../../dist/contact-form.zip"
  handler         = "index.handler"
  runtime         = "nodejs22.x"
  timeout         = 10
  role_arn        = module.contact_form_iam.role_arn
  description     = "Handles contact form submissions. Validates inputs, verifies reCAPTCHA, and sends emails via SES"
  environment_variables = {
    RECAPTCHA_SECRET = data.aws_ssm_parameter.recaptcha_secret.value
    SES_FROM_ADDRESS = data.aws_ssm_parameter.ses_from_address.value
  }
}
```
