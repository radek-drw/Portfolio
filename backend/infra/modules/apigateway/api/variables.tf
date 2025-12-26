variable "env_name" { type = string }
variable "allow_origins" { type = list(string) }
variable "description" {}
variable "allow_methods" {
  type    = list(string)
  default = ["OPTIONS"]
}
