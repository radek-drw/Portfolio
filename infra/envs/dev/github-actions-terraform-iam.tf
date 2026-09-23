data "aws_caller_identity" "current" {}

resource "aws_iam_role" "github_actions_terraform" {

  name = "${local.env_name}-github-actions-terraform-role"

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

resource "aws_iam_policy" "github_actions_terraform" {

  name = "${local.env_name}-github-actions-terraform-policy"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      # LAMBDA
      {
        Effect = "Allow"

        Action = [
          "lambda:CreateFunction",
          "lambda:GetFunction",
          "lambda:GetFunctionConfiguration",
          "lambda:GetPolicy",
          "lambda:UpdateFunctionConfiguration",
          "lambda:AddPermission",
          "lambda:RemovePermission",
          "lambda:DeleteFunction"
        ]

        Resource = [
          "arn:aws:lambda:eu-west-1:${data.aws_caller_identity.current.account_id}:function:dev-*-lambda"
        ]
      },
      # IAM
      {
        Effect = "Allow"

        Action = [
          "iam:CreatePolicy",
        ]

        Resource = ["*"]
      },
      {
        Effect = "Allow"

        Action = [
          "iam:DeletePolicy",
          "iam:GetPolicy",
          "iam:CreatePolicyVersion",
          "iam:DeletePolicyVersion",
          "iam:GetPolicyVersion",
          "iam:ListPolicyVersions"
        ]

        Resource = [
          "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/dev-*-policy"
        ]
      },
      {
        Effect = "Allow"

        Action = [
          "iam:CreateRole"
        ]

        Resource = "*"
      },
      {
        Effect = "Allow"

        Action = [
          "iam:DeleteRole",
          "iam:GetRole",
          "iam:UpdateAssumeRolePolicy"
        ]

        Resource = [
          "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/dev-*-role"
        ]
      },
      {
        Effect = "Allow"

        Action = [
          "iam:AttachRolePolicy",
          "iam:DetachRolePolicy"
        ]

        Resource = [
          "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/dev-*-role"
        ]

        Condition = {
          "ArnLike" = {
            "iam:PolicyARN" = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/dev-*-policy"
          }
        }
      },
      # APIGATEWAY
      {
        Effect = "Allow"

        Action = [
          "apigateway:POST"
        ]

        Resource = [
          "arn:aws:apigateway:eu-west-1::/apis",
          "arn:aws:apigateway:eu-west-1::/apis/*/stages",
          "arn:aws:apigateway:eu-west-1::/apis/*/integrations",
          "arn:aws:apigateway:eu-west-1::/apis/*/routes"
        ]
      },
      {
        Effect = "Allow"

        Action = [
          "apigateway:DELETE",
          "apigateway:GET",
          "apigateway:PATCH"
        ]

        Resource = [
          "arn:aws:apigateway:eu-west-1::/apis/*",
          "arn:aws:apigateway:eu-west-1::/apis/*/stages/*",
          "arn:aws:apigateway:eu-west-1::/apis/*/integrations/*",
          "arn:aws:apigateway:eu-west-1::/apis/*/routes/*"
        ]
      },
      # ACM
      {
        Effect = "Allow"

        Action = [
          "acm:RequestCertificate"
        ]

        Resource = "*"
      },
      {
        Effect = "Allow"

        Action = [
          "acm:DescribeCertificate",
          "acm:DeleteCertificate"
        ]

        Resource = "arn:aws:acm:us-east-1:${data.aws_caller_identity.current.account_id}:certificate/*"
      },
      # CLOUDFRONT
      {
        Effect = "Allow"

        Action = [
          "cloudfront:CreateDistribution",
          "cloudfront:CreateOriginAccessControl"
        ]

        Resource = "*"
      },
      {
        Effect = "Allow"

        Action = [
          "cloudfront:GetDistribution",
          "cloudfront:UpdateDistribution",
          "cloudfront:DeleteDistribution"
        ]

        Resource = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/*"
      },
      {
        Effect = "Allow"

        Action = [
          "cloudfront:GetOriginAccessControl",
          "cloudfront:UpdateOriginAccessControl",
          "cloudfront:DeleteOriginAccessControl"
        ]

        Resource = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:origin-access-control/*"
      },
      {
        Effect = "Allow"

        Action = [
          "cloudfront:GetCachePolicy"
        ]

        Resource = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:cache-policy/*"
      },
      # ROUTE53
      {
        Effect = "Allow"

        Action = [
          "route53:ListHostedZonesByName"
        ]

        Resource = "*"
      },
      {
        Effect = "Allow"

        Action = [
          "route53:ChangeResourceRecordSets"
        ]

        Resource = "arn:aws:route53:::hostedzone/${module.frontend.hosted_zone_id}"

        Condition = {
          "ForAllValues:StringEquals" = {
            "route53:ChangeResourceRecordSetsActions" = [
              "CREATE",
              "UPSERT",
              "DELETE"
            ]

            "route53:ChangeResourceRecordSetsRecordTypes" = [
              "A",
              "AAAA",
              "CNAME"
            ]
          }
        }
      },
      # S3
      {
        Effect = "Allow"
        Action = [
          "s3:CreateBucket",
          "s3:PutBucketTagging",
          "s3:GetBucketPublicAccessBlock",
          "s3:PutBucketPublicAccessBlock",
          "s3:GetEncryptionConfiguration",
          "s3:PutEncryptionConfiguration",
          "s3:DeleteBucket"
        ]
        Resource = "arn:aws:s3:::bucket*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_actions_terraform" {

  role       = aws_iam_role.github_actions_terraform.name
  policy_arn = aws_iam_policy.github_actions_terraform.arn
}
