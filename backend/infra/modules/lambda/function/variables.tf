variable "env_name" { type = string }
variable "lambda_name" { type = string }
variable "description" { type = string }
variable "lambda_zip_path" { type = string }
variable "handler" {
  type    = string
  default = "index.handler"
}
variable "runtime" {
  type    = string
  default = "nodejs22.x"
}
variable "timeout" {
  type    = number
  default = 3
}
variable "role_arn" { type = string }
variable "environment_variables" {
  type    = map(string)
  default = {}
}
