resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-locks-table"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "LockID"
    type = "S"
  }

  hash_key = "LockID"
}