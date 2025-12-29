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
| [aws_apigatewayv2_integration.integration](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_integration) | resource |
| [aws_apigatewayv2_route.route](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_route) | resource |
| [aws_lambda_permission.permission](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_api_id"></a> [api\_id](#input\_api\_id) | ID of the API Gateway HTTP API | `string` | n/a | yes |
| <a name="input_execution_arn"></a> [execution\_arn](#input\_execution\_arn) | Execution ARN of the API Gateway, used to scope Lambda permissions | `string` | n/a | yes |
| <a name="input_lambda_invoke_arn"></a> [lambda\_invoke\_arn](#input\_lambda\_invoke\_arn) | Invoke ARN of the Lambda function used as the integration target | `string` | n/a | yes |
| <a name="input_lambda_name"></a> [lambda\_name](#input\_lambda\_name) | Name of the Lambda function to grant invoke permissions | `string` | n/a | yes |
| <a name="input_route_key"></a> [route\_key](#input\_route\_key) | Route key for the API Gateway route (e.g. POST /contact) | `string` | n/a | yes |

## Outputs

No outputs.
<!-- END_TF_DOCS -->

## Usage

```hcl
module "contact_route" {
  source            = "../../modules/apigateway/route"
  api_id            = module.api.api_id
  execution_arn     = module.api.execution_arn
  route_key         = "POST /contact"
  lambda_name       = module.contact_form_lambda.name
  lambda_invoke_arn = module.contact_form_lambda.invoke_arn
}
```
