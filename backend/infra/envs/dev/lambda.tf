module "contact_form_lambda" {
  source          = "../../modules/lambda/function"
  env_name        = var.env_name
  lambda_name     = local.contact_form_lambda_name
  lambda_zip_path = "../../../dist/contact-form.zip"
  handler         = "index.handler"
  runtime         = "nodejs22.x"
  timeout         = 10
  role_arn        = module.contact_form_iam.role_arn
  description     = "Handles contact form submissions. Validates inputs, verifies reCAPTCHA, and sends emails via SES"
  environment_variables = {
    RECAPTCHA_SECRET = data.aws_ssm_parameter.recaptcha_secret.value
    SES_FROM_ADDRESS = data.aws_ssm_parameter.ses_from_address.value
  }
}