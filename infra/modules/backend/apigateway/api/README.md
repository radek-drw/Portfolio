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
| [aws_apigatewayv2_api.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_api) | resource |
| [aws_apigatewayv2_stage.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_stage) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_allow_methods"></a> [allow\_methods](#input\_allow\_methods) | Allowed HTTP methods for CORS configuration | `list(string)` | <pre>[<br/>  "OPTIONS"<br/>]</pre> | no |
| <a name="input_allow_origins"></a> [allow\_origins](#input\_allow\_origins) | Allowed CORS origins for the HTTP API | `list(string)` | n/a | yes |
| <a name="input_description"></a> [description](#input\_description) | Description of the API Gateway HTTP API | `string` | n/a | yes |
| <a name="input_env_name"></a> [env\_name](#input\_env\_name) | Environment name for resource naming and API stage (e.g. dev, prod) | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_api_id"></a> [api\_id](#output\_api\_id) | API Gateway ID used for route creation and integrations |
| <a name="output_api_url"></a> [api\_url](#output\_api\_url) | Full API URL with stage, for frontend use |
| <a name="output_execution_arn"></a> [execution\_arn](#output\_execution\_arn) | Execution ARN used for Lambda permissions and integrations |
<!-- END_TF_DOCS -->

## Usage

```hcl
module "api" {
  source        = "../../modules/apigateway/api"
  env_name      = var.env_name
  allow_origins = ["http://localhost:9000"]
  allow_methods = ["OPTIONS", "POST"]
  description   = "API Gateway for ${var.env_name} environment"
}
```
