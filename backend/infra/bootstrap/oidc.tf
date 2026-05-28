resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1"
  ]
}

resource "aws_iam_role" "github_actions_lambda_dev" {
  name = "github-actions-lambda-dev-role"

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
            "token.actions.githubusercontent.com:sub": "repo:radek-drw/Portfolio:ref:refs/heads/dev"
          }
        }
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_deploy" {
  name = "lambda-deploy-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"

        Action = [
          "lambda:UpdateFunctionCode"
        ]

        Resource = "arn:aws:lambda:eu-west-1:123456789012:function:contact-form-dev"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_lambda_deploy" {
  role       = aws_iam_role.github_actions_lambda_dev.name
  policy_arn = aws_iam_policy.lambda_deploy.arn
}