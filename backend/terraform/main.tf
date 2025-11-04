provider "aws" {
  region = "eu-west-1"
}

# ============================================
# Lambda IAM role with SES access
# ============================================

resource "aws_iam_role" "lambda_ses_role" {
  name = "lambda-ses-role"

  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = {
            Service   = "lambda.amazonaws.com"
        }
        Action    = "sts:AssumeRole"
      }
    ]
  })
}

# ============================================
# Policy granting permissions for SES + CloudWatch
# ============================================

resource "aws_iam_policy" "lambda_ses_policy" {
  name        = "lambda-ses-policy"
  description = "Allows Lambda to send emails using SES and write logs to CloudWatch"

  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      # Allows sending emails via SES
      {
        Effect   = "Allow"
        Action   = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      },
      # Allows writing logs to CloudWatch
      {
        Effect   = "Allow"
        Action   = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

# ============================================
# Attach the policy to the IAM role
# ============================================

resource "aws_iam_role_policy_attachment" "lambda_ses_attach" {
  role       = aws_iam_role.lambda_ses_role.name
  policy_arn = aws_iam_policy.lambda_ses_policy.arn
}

# ============================================
# Lambda function for sending contact form emails
# ============================================

resource "aws_lambda_function" "send_contact_form" {
  function_name    = "send-contact-form"
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  timeout          = 10
  role             = aws_iam_role.lambda_ses_role.arn
  filename         = "${path.module}/../dist/sendContactForm.zip"
  source_code_hash = filebase64sha256("${path.module}/../dist/sendContactForm.zip")

  environment {
    variables = {
      RECAPTCHA_SECRET   = """"
      SES_FROM_ADDRESS   = "rdrweski@outlook.com"
    }
  }
}

# ============================================
# API Gateway (HTTP API)
# ============================================
resource "aws_apigatewayv2_api" "contact_api" {
  name          = "contact-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [
      "http://localhost:9000",  # Local testing
      "https://radek-drweski.com/" 
    ]
    allow_methods = ["OPTIONS", "POST"]
    allow_headers = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token"]
    allow_credentials = false
    max_age = 3600
  }
}

# ============================================
# Integration: Connect API Gateway with Lambda
# ============================================
resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.contact_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.send_contact_form.invoke_arn
  payload_format_version = "2.0" 
}

# ============================================
# Route (POST /contact)
# ============================================
resource "aws_apigatewayv2_route" "contact_route" {
  api_id    = aws_apigatewayv2_api.contact_api.id
  route_key = "POST /contact" # Defines the method and path
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# ============================================
# Deployment + Stage (e.g. dev)
# ============================================
resource "aws_apigatewayv2_stage" "dev_stage" {
  api_id      = aws_apigatewayv2_api.contact_api.id
  name        = "dev" # Stage name, appears in the final URL
  auto_deploy = true  # Automatically deploy changes after updates
}

# ============================================
# Permission – allow API Gateway to invoke Lambda
# ============================================
resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.send_contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact_api.execution_arn}/*/*" # Allow all routes/methods
}

# ============================================
# Output – show the final API URL after apply
# ============================================
output "api_url" {
  value = "${aws_apigatewayv2_api.contact_api.api_endpoint}/${aws_apigatewayv2_stage.dev_stage.name}"
}
