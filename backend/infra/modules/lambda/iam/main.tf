resource "aws_iam_role" "role" {
  name = "${var.env_name}-${var.lambda_name}-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_policy" "policy" {
  name        = "${var.env_name}-${var.lambda_name}-policy"
  description = var.policy_description
  policy      = jsonencode(var.policy_document)
}

resource "aws_iam_role_policy_attachment" "attach" {
  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.policy.arn
}