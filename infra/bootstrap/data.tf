data "aws_caller_identity" "current" {}
data "aws_region" "current" {}
data "aws_region" "us_east_1" {
  provider = aws.us_east_1
}
