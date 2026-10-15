resource "aws_s3_bucket" "this" {
  bucket = var.frontend_bucket_name
}
