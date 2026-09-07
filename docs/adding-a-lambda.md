# How to add a new Lambda function

Terraform creates the Lambda infrastructure and provides the initial deployment package. Subsequent Lambda code updates are handled by **GitHub Actions**

Terraform ignores changes to `filename` and `source_code_hash`, so changing the Lambda code locally doesn't cause Terraform to update the deployed code

## 1. Create the Lambda source

`backend/src/my-function.js/`

## 2. Add the Terraform configuration

`infra/stacks/backend/my-function/`

**lambda.tf**

```
module "lambda" {
  source          = "../../../modules/backend/lambda/function"
  env_name        = var.env_name
  lambda_name     = local.lambda_name
  lambda_zip_path = "${path.root}/../../../backend/dist/my-function.zip"
  role_arn        = module.iam.arn
  description     = "Example Lambda function"
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
  value = module.lambda.arn
}
```

> **Note**: The lambda_arn output is used by the environment configuration to grant GitHub Actions permission to update this Lambda's code

**variables.tf**

```
variable "env_name" {
  description = "Environment name (dev, prod)"
  type        = string
}
```

## 3. Build the Lambda

Run from `backend/` directory:

```
pnpm build:lambda
```

This will create a ZIP file required by Terraform when creating the Lambda for the first time

## 4. Add the Lambda stack to the environment

`envs/dev/main.tf`

```
module "my_function" {
  source = "../../stacks/backend/my-function"
  env_name = local.env_name
}
```

Do the same in `envs/prod/main.tf`

## 5. Add GitHub Actions deployment permission

Add the new Lambda ARN to the GitHub Actions deployment policy in:

`infra/envs/dev/github-actions.tf`

```
Resource = [
  module.other_function.lambda_arn,
  module.my_function.lambda_arn
]
```

Make the same change in `envs/prod/github-actions.tf`

## 6. Create the infrastructure

Run Terraform from the appropriate environment directory:

```
terraform init
terraform plan
terraform apply
```

This creates the Lambda infrastructure and performs the initial code deployment

After that, changes to the Lambda code should be deployed through GitHub Actions rather than Terraform

## 7. Add an API Gateway route (if required)

Lambda only needs an API Gateway route if it is invoked through API Gateway

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

Lambdas triggered by other AWS services, such as S3, SQS, or EventBridge, don't need an API Gateway route
