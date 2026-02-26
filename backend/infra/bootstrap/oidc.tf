# ============================================
# GitHub OIDC provider – allows CI workflow to assume AWS roles
# ============================================
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1"
  ]
}

# ============================================
# IAM Role for dev branch – only GitHub Actions from dev branch can assume
# ============================================
resource "aws_iam_role" "github_actions_dev" {
  name = "github-actions-terraform-dev-role"

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
            "token.actions.githubusercontent.com:sub" = "repo:radek-drw/Portfolio:ref:refs/heads/dev"
          }
        }
      }
    ]
  })
}

# ============================================
# IAM Role for main branch – only GitHub Actions from main branch can assume
# ============================================
resource "aws_iam_role" "github_actions_prod" {
  name = "github-actions-terraform-prod-role"

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
            "token.actions.githubusercontent.com:sub" = "repo:radek-drw/Portfolio:ref:refs/heads/main"
          }
        }
      }
    ]
  })
}

# ============================================
# Attach AdministratorAccess policy to dev and prod roles
# ============================================
resource "aws_iam_role_policy_attachment" "dev_admin" {
  role       = aws_iam_role.github_actions_dev.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_role_policy_attachment" "prod_admin" {
  role       = aws_iam_role.github_actions_prod.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}