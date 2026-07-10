data "aws_ssm_parameter" "recaptcha_secret" {
  name            = "recaptcha-secret"
  with_decryption = true
}

data "aws_ssm_parameter" "ses_from_address" {
  name            = "ses-from-address"
  with_decryption = true
}

module "send_email_lambda" {
  source          = "../../modules/lambda/function"
  env_name        = var.env_name
  lambda_name     = local.send_email_lambda_name
  lambda_zip_path = "../../../dist/send-email.zip"
  handler         = "index.handler"
  runtime         = "nodejs22.x"
  timeout         = 10
  role_arn        = module.send_email_iam.role_arn
  description     = "Handles contact form submissions. Validates inputs, verifies reCAPTCHA, and sends emails via SES"
  environment_variables = {
    RECAPTCHA_SECRET = data.aws_ssm_parameter.recaptcha_secret.value
    SES_FROM_ADDRESS = data.aws_ssm_parameter.ses_from_address.value
  }
}
