# This resource allows AWS to trust identity tokens issued by GitHub Actions
# It is account level GitHub OIDC provider shared by all environments, so it is created only once in the bootstrap configuration
# IAM roles for GitHub Actions are defined in DEV and PROD environments

resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1"
  ]
}