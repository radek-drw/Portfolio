data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_role" "github_actions_lambda_deploy" {

  name = "${local.env_name}-github-actions-lambda-deploy-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Federated = data.aws_iam_openid_connect_provider.github.arn
        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }

          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:radek-drw/Portfolio:ref:refs/heads/${local.env_name}"
          }
        }
      }
    ]
  })
}

resource "aws_iam_policy" "github_actions_lambda_deploy" {

  name = "${local.env_name}-github-actions-lambda-deploy-policy"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "lambda:UpdateFunctionCode"
        ]

        Resource = module.contact_form.lambda_arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_actions_lambda_deploy" {
  role       = aws_iam_role.github_actions_lambda_deploy.name
  policy_arn = aws_iam_policy.github_actions_lambda_deploy.arn
}