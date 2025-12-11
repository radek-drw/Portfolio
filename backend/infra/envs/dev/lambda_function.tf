data "aws_ssm_parameter" "recaptcha_secret" {
  name            = "recaptcha_secret"
  with_decryption = true
}

data "aws_ssm_parameter" "ses_from_address" {
  name            = "ses_from_address"
  with_decryption = true
}

module "contact_form_lambda" {
  source          = "../../modules/lambda_function"
  env_name        = "dev"
  lambda_name     = "contact_form"
  lambda_zip_path = "../../../dist/sendContactForm.zip"
  handler         = "index.handler"
  runtime         = "nodejs22.x"
  timeout         = 10
  role_arn        = module.contact_form_iam.role_arn
  environment_variables = {
    RECAPTCHA_SECRET = data.aws_ssm_parameter.recaptcha_secret.value
    SES_FROM_ADDRESS = data.aws_ssm_parameter.ses_from_address.value
  }
}
