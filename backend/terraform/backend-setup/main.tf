provider "aws" {
  region = "eu-west-1"
}

# ============================================
# S3 Bucket for storing Terraform state files
# ============================================
resource "aws_s3_bucket" "terraform_state" {
  bucket = "radek-portfolio-terraform-state"
}

# ============================================
# Enable versioning on the Terraform state bucket
# ============================================
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

# ============================================
# Enable server-side encryption (SSE) on the bucket
# ============================================
resource "aws_s3_bucket_server_side_encryption_configuration" "encryption" {
  bucket = aws_s3_bucket.terraform_state.bucket
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# ============================================
# DynamoDB Table for Terraform state locks
# ============================================
resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-locks-table"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "LockID"
    type = "S"
  }

  hash_key = "LockID"
}

# ============================================
# Terraform backend outputs
# ============================================
output "s3_bucket_name" {
  value = aws_s3_bucket.terraform_state.bucket
}

output "dynamodb_table_name" {
  value = aws_dynamodb_table.terraform_locks.name
}
