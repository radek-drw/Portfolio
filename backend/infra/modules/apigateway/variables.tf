variable "env_name" {}
variable "lambda_name" {}
variable "lambda_invoke_arn" {}
variable "allow_origins" {
  type = list(string)
}
