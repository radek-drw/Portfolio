terraform {
  backend "s3" {
    bucket         = "radek-portfolio-terraform-state"
    key            = "bootstrap/terraform.tfstate"
    region         = "eu-west-1"
    use_lockfile   = true
    encrypt        = true
  }
}