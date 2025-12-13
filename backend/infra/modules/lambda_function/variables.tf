variable "env_name" {}
variable "lambda_name" {}
variable "lambda_zip_path" {}
variable "handler" { default = "index.handler" }
variable "runtime" { default = "nodejs22.x" }
variable "timeout" { default = 10 }
variable "role_arn" {}
variable "environment_variables" {
  type    = map(string)
  default = {}
}
