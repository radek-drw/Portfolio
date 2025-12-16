variable "env_name" { type = string }
variable "allow_origins" { type = list(string) }
variable "allow_methods" {
  type    = list(string)
  default = ["OPTIONS"]
}
