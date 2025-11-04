variable "env_name" {}
variable "lambda_invoke_arn" {}
variable "lambda_name" {}
variable "allow_origins" {
  type = list(string)
}
