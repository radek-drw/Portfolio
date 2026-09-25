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
          "lambda:GetFunctionCodeSigningConfig",
          "lambda:GetPolicy",
          "lambda:ListVersionsByFunction",
          "lambda:UpdateFunctionCode",
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
          "iam:CreatePolicyVersion",
          "iam:GetPolicy",
          "iam:GetPolicyVersion",
          "iam:ListPolicyVersions",
          "iam:DeletePolicyVersion",
          "iam:DeletePolicy"
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
          "iam:GetRole",
          "iam:ListRolePolicies",
          "iam:ListAttachedRolePolicies",
          "iam:UpdateAssumeRolePolicy",
          "iam:DeleteRole"
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
          "acm:ListTagsForCertificate",
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
          "cloudfront:ListTagsForResource",
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
      {
        Effect = "Allow"
        Action = [
          "cloudfront:ListCachePolicies"
        ]
        Resource = "*"
      },
      # ROUTE53
      {
        Effect = "Allow"
        Action = [
          "route53:ListHostedZones",
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "route53:GetHostedZone",
          "route53:ListTagsForResource",
          "route53:ListResourceRecordSets"
        ]
        Resource = "arn:aws:route53:::hostedzone/${module.frontend.hosted_zone_id}"
      },
      {
        Effect = "Allow"
        Action = [
          "route53:ChangeResourceRecordSets"
        ]
        Resource = "arn:aws:route53:::hostedzone/${module.frontend.hosted_zone_id}"
        Condition = {
          "ForAllValues:StringEquals" = {
            "route53:ChangeResourceRecordSetsActions"     = ["CREATE", "UPSERT", "DELETE"]
            "route53:ChangeResourceRecordSetsRecordTypes" = ["A", "AAAA", "CNAME"]
          }
        }
      },
      # S3
      {
        Effect = "Allow"
        Action = [
          "s3:CreateBucket",
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket",
          "s3:GetBucketAcl",
          "s3:PutBucketTagging",
          "s3:GetBucketPublicAccessBlock",
          "s3:PutBucketPublicAccessBlock",
          "s3:GetEncryptionConfiguration",
          "s3:PutEncryptionConfiguration",
          "s3:GetBucketPolicy",
          "s3:DeleteBucketPolicy",
          "s3:DeleteBucket"
        ]
        Resource = module.frontend.bucket_arn
      },
      # S3 - Terraform state
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = "arn:aws:s3:::radek-portfolio-terraform-state"
        Condition = {
          StringLike = {
            "s3:prefix" = "dev/*"
          }
        }
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "arn:aws:s3:::radek-portfolio-terraform-state/dev/terraform.tfstate"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "arn:aws:s3:::radek-portfolio-terraform-state/dev/terraform.tfstate.tflock"
      },
      # OIDC
      {
        Effect = "Allow"
        Action = [
          "iam:ListOpenIDConnectProviders"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "iam:GetOpenIDConnectProvider"
        ]
        Resource = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"
      },
      # SSM
      {
        Effect = "Allow"
        Action = [
          "ssm:GetParameter"
        ]
        Resource = [
          "arn:aws:ssm:eu-west-1:${data.aws_caller_identity.current.account_id}:parameter/recaptcha-secret",
          "arn:aws:ssm:eu-west-1:${data.aws_caller_identity.current.account_id}:parameter/ses-from-address"
        ]
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_actions_terraform" {

  role       = aws_iam_role.github_actions_terraform.name
  policy_arn = aws_iam_policy.github_actions_terraform.arn
}
