data "aws_ssm_parameter" "recaptcha_secret" {
  name            = "recaptcha-secret"
  with_decryption = true
}

data "aws_ssm_parameter" "ses_from_address" {
  name            = "ses-from-address"
  with_decryption = true
}