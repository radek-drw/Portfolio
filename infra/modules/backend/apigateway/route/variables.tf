variable "api_id" {
  description = "ID of the API Gateway HTTP API"
  type        = string
}

variable "lambda_invoke_arn" {
  description = "Invoke ARN of the Lambda function used as the integration target"
  type        = string
}

variable "route_key" {
  description = "Route key for the API Gateway route (e.g. POST /contact)"
  type        = string
}

variable "lambda_name" {
  description = "Name of the Lambda function to grant invoke permissions"
  type        = string
}

variable "execution_arn" {
  description = "Execution ARN of the API Gateway, used to scope Lambda permissions"
  type        = string
}
