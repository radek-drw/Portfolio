variable "env_name" { type = string }
variable "lambda_name" { type = string }
variable "lambda_invoke_arn" { type = string }
variable "allow_origins" { type = list(string) }
variable "route_key" { type = string }
variable "allow_methods" {
  type    = list(string)
  default = ["OPTIONS"]
}
