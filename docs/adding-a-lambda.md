# How to add a new Lambda function

## 1. Create the Lambda source

`backend/src/my-function.js`

## 2. Add the Terraform configuration

`infra/stacks/backend/my-function`

**lambda.tf**

```
module "lambda" {
  source                       = "../../../modules/backend/lambda/function"
  env_name                     = var.env_name
  lambda_name                  = local.lambda_name
  lambda_artifacts_bucket_name = var.lambda_artifacts_bucket_name
  lambda_s3_key                = var.lambda_s3_key
  role_arn                     = module.iam.role_arn
  description                  = "Example Lambda function"
}
```

**iam.tf**

```
module "iam" {
  source             = "../../../modules/backend/lambda/iam"
  env_name           = var.env_name
  lambda_name        = local.lambda_name
  policy_description = "Allows Lambda to write logs to CloudWatch"

  policy_document = {
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]

        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  }
}
```

Add any additional permissions required by the Lambda itself to `policy_document`

**locals.tf**

```
locals {
  lambda_name = "my-function"
}
```

**outputs.tf**

```
output "lambda_arn" {
  description = "ARN of the Lambda function"
  value       = module.lambda.lambda_arn
}
```

> **Note**: The lambda_arn output is used by the environment configuration to grant GitHub Actions permission to update this Lambda's code

**variables.tf**

```
variable "env_name" {
  description = "Environment name (dev, prod)"
  type        = string
}

variable "lambda_artifacts_bucket_name" {
  description = "S3 bucket containing Lambda deployment artifacts"
  type        = string
}

variable "lambda_s3_key" {
  description = "S3 object key of the Lambda deployment artifact"
  type        = string
}
```

## 3. Add the Lambda stack to the environment

`envs/dev/main.tf`

```
module "my_function" {
  source = "../../stacks/backend/my-function"

  lambda_artifacts_bucket_name = local.lambda_artifacts_bucket_name
  lambda_s3_key                = "${local.env_name}/my-function.zip"
  env_name                     = local.env_name
}
```

Do the same in `envs/prod/main.tf`

## 4. Add an API Gateway route (if required)

Add an API Gateway route if the Lambda function needs to be invoked through API Gateway.

Create:

`stacks/backend/my-function/route.tf`

For example:

```
module "route" {
  source = "../../../modules/backend/apigateway/route"
  api_id = var.api_id
  execution_arn = var.execution_arn
  route_key = "POST /my-function"
  lambda_name = module.lambda.name
  lambda_invoke_arn = module.lambda.invoke_arn
}
```

In the environment `main.tf`:

```
module "my_functions" {
  # ...

  api_id                       = module.api.api_id
  execution_arn                = module.api.execution_arn
}
```

If the Lambda is invoked by another AWS service, an API Gateway route is not required. For example, Lambdas triggered by S3, SQS, or EventBridge use their respective AWS integrations instead.
