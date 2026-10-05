data "aws_caller_identity" "current" {}

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
            "token.actions.githubusercontent.com:sub" = "repo:radek-drw/Portfolio:ref:refs/heads/${local.git_branch}"
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
        Resource = [
          "arn:aws:lambda:${data.aws_caller_identity.current.account_id}:function:dev-*-lambda"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject"
        ]
        Resource = [
          "arn:aws:s3:::${local.lambda_artifacts_bucket_name}/${local.env_name}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_actions_lambda_deploy" {
  role       = aws_iam_role.github_actions_lambda_deploy.name
  policy_arn = aws_iam_policy.github_actions_lambda_deploy.arn
}
