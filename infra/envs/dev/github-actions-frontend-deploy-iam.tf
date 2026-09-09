resource "aws_iam_role" "github_actions_frontend_deploy" {

  name = "${local.env_name}-github-actions-frontend-deploy-role"

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

resource "aws_iam_policy" "github_actions_frontend_deploy" {

  name = "${local.env_name}-github-actions-frontend-deploy-policy"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "s3:ListBucket"
        ]

        Resource = [
          module.frontend.bucket_arn
        ]
      },
      {
        Effect = "Allow"

        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject"
        ]

        Resource = [
          "${module.frontend.bucket_arn}/*"
        ]
      },
      {
        Effect = "Allow"

        Action = [
          "cloudfront:CreateInvalidation"
        ]

        Resource = [
          module.frontend.distribution_arn
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_actions_frontend_deploy" {

  role       = aws_iam_role.github_actions_frontend_deploy.name
  policy_arn = aws_iam_policy.github_actions_frontend_deploy.arn
}