provider "aws" {
  region = "eu-west-1"
}

module "lambda_iam" {
  source             = "../../modules/lambda_iam"
  env_name           = "dev"
  lambda_name        = "contact-form"
  policy_description = "IAM policy for contact lambda"
  lambda_zip_path    = "../../../dist/sendContactForm.zip"
  policy_json = {
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
        Effect = "Allow"
        Action = ["ssm:GetParameter", "ssm:GetParameters"]
        Resource = [
          "arn:aws:ssm:eu-west-1:${data.aws_caller_identity.current.account_id}:parameter/recaptcha_secret",
          "arn:aws:ssm:eu-west-1:${data.aws_caller_identity.current.account_id}:parameter/ses_from_address"
        ]
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