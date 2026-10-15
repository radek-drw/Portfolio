resource "aws_s3_bucket_policy" "this" {
  bucket = module.s3.bucket_id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipalReadOnly"
        Effect = "Allow"

        Principal = {
          Service = "cloudfront.amazonaws.com"
        }

        Action = [
          "s3:GetObject"
        ]

        Resource = [
          "${module.s3.bucket_arn}/*"
        ]

        Condition = {
          StringEquals = {
            "AWS:SourceArn" = module.cloudfront.distribution_arn
          }
        }
      }
    ]
  })
}