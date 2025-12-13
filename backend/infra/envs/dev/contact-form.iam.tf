module "lambda_iam" {
  source             = "../../modules/lambda_iam"
  env_name           = "dev"
  lambda_name        = "contact-form"
  policy_description = "IAM policy for contact-form Lambda"
  policy_document = {
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["ses:SendEmail", "ses:SendRawEmail"]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect   = "Allow"
        Action   = ["ssm:GetParameter", "ssm:GetParameters"]
        Resource = "arn:aws:ssm:eu-west-1:*:parameter/*"
      }
    ]
  }
}

module "apigateway" {
  source            = "../../modules/apigateway"
  env_name          = "dev"
  lambda_invoke_arn = module.lambda.lambda_arn
  lambda_name       = module.lambda.lambda_arn
  allow_origins     = ["http://localhost:9000"]
}