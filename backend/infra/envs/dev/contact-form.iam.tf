module "contact_form_iam" {
  source             = "../../modules/lambda_iam"
  env_name           = "dev"
  lambda_name        = module.contact_form_lambda.lambda_name
  policy_description = "IAM policy for ${module.contact_form_lambda.lambda_name} Lambda"
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