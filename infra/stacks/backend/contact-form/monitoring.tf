resource "aws_cloudwatch_metric_alarm" "lambda_errors" {
  alarm_name          = "${var.env_name}-${local.lambda_name}-errors"
  alarm_description   = "Lambda invocation failed, timed out, or returned an unhandled error"
  namespace           = "AWS/Lambda"
  metric_name         = "Errors"
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = module.lambda.lambda_name
  }
  alarm_actions = [aws_sns_topic.lambda_alerts.arn]
}

resource "aws_cloudwatch_metric_alarm" "lambda_duration_warning" {
  alarm_name          = "${var.env_name}-${local.lambda_name}-duration-warning"
  alarm_description   = "Lambda execution approached the 10-second timeout"
  namespace           = "AWS/Lambda"
  metric_name         = "Duration"
  statistic           = "Maximum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 8000
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = module.lambda.lambda_name
  }

  alarm_actions = [aws_sns_topic.lambda_alerts.arn]
}

resource "aws_sns_topic" "lambda_alerts" {
  name = "${var.env_name}-${local.lambda_name}-alerts"
}

resource "aws_sns_topic_subscription" "lambda_errors_email" {
  topic_arn = aws_sns_topic.lambda_alerts.arn
  protocol  = "email"
  endpoint  = var.alarm_email
}
