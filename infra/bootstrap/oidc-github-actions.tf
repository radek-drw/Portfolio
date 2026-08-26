# GitHub Actions authentication via OIDC
# Allows CI/CD workflows to deploy Lambda functions

resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1"
  ]
}


locals {
  environments = {
    dev = {
      branch_name = "dev"
      lambda_name = "dev-send-email-lambda"
    }
    prod = {
      branch_name = "main"
      lambda_name = "prod-send-email-lambda"
    }
  }
}

resource "aws_iam_role" "github_actions_lambda" {
  for_each = local.environments 

  name = "github-actions-lambda-${each.key}-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }

          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:radek-drw/Portfolio:ref:refs/heads/${each.value.branch_name}"
          }
        }
      }
    ]
  })
}

resource "aws_iam_policy" "github_actions_lambda" {
  for_each = local.environments

  name = "github-actions-lambda-${each.key}-policy"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "lambda:UpdateFunctionCode"
        ]

        Resource = "arn:aws:lambda:eu-west-1:438985215894:function:${each.value.lambda_name}"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_actions_lambda" {
  for_each = local.environments

  role       = aws_iam_role.github_actions_lambda[each.key].name
  policy_arn = aws_iam_policy.github_actions_lambda[each.key].arn
}