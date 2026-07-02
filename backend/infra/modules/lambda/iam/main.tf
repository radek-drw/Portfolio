resource "aws_iam_role" "this" {
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

resource "aws_iam_policy" "this" {
  name        = "${var.env_name}-${var.lambda_name}-policy"
  description = var.policy_description
  policy      = jsonencode(var.policy_document)
}

resource "aws_iam_role_policy_attachment" "this" {
  role       = aws_iam_role.this.name
  policy_arn = aws_iam_policy.this.arn
}