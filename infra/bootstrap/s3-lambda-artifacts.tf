resource "aws_s3_bucket" "lambda_artifacts" {
  bucket = "radek-portfolio-lambda-artifacts"
}

resource "aws_s3_bucket_versioning" "lambda_artifacts" {
  bucket = aws_s3_bucket.lambda_artifacts.id

  versioning_configuration {
    status = "Enabled"
  }
}
