data "aws_ssm_parameter" "recaptcha_secret" {
  name            = "recaptcha_secret"
  with_decryption = true
}

data "aws_ssm_parameter" "ses_from_address" {
  name            = "ses_from_address"
  with_decryption = true
}

resource "aws_iam_role" "lambda_role" {
  name = "${var.env_name}-lambda-ses-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_policy" "lambda_policy" {
  name = "${var.env_name}-lambda-ses-policy"
  description = "Allows Lambda to send emails via SES, write logs to CloudWatch, and read configuration parameters from SSM"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["ses:SendEmail", "ses:SendRawEmail"]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = ["ssm:GetParameter","ssm:GetParameters"]
        Resource = [
          "arn:aws:ssm:eu-west-1:${data.aws_caller_identity.current.account_id}:parameter/recaptcha_secret",
          "arn:aws:ssm:eu-west-1:${data.aws_caller_identity.current.account_id}:parameter/ses_from_address"
        ]
      } 
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attach" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_lambda_function" "contact_form" {
  function_name    = "${var.env_name}-send-contact-form"
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  timeout          = 10
  role             = aws_iam_role.lambda_role.arn
  filename         = var.lambda_zip_path
  source_code_hash = filebase64sha256(var.lambda_zip_path)

  environment {
      variables = {
        RECAPTCHA_SECRET = data.aws_ssm_parameter.recaptcha_secret.value
        SES_FROM_ADDRESS = data.aws_ssm_parameter.ses_from_address.value
      }
  }
}