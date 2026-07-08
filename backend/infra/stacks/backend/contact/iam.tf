data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

module "send_email_iam" {
  source             = "../../modules/lambda/iam"
  env_name           = var.env_name
  lambda_name        = local.send_email_lambda_name
  policy_description = "Allows Lambda to send emails (SES), write logs (CloudWatch), and read config from SSM"
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
        Effect = "Allow"
        Action = ["ssm:GetParameter"]
        Resource = [
          "arn:aws:ssm:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:parameter/recaptcha_secret",
          "arn:aws:ssm:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:parameter/ses-from-address"
        ]
      }
    ]
  }
}