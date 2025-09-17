## Form Validation Flow

- The form has two layers of validation: **frontend** and **backend**.
- Once the frontend validation passes, the backend applies the same validation rules for consistency.
- If validation fails on the backend, it responds with status code **400** and an error object.
- Errors are returned as codes (e.g., `{ name: "REQUIRED" }`, `{ email: "INVALID" }`).
- On the frontend, the function `showBackendValidationErrors` checks for these errors.
- If an error exists, the function uses the same error message mapping as the frontend validation.
- This ensures consistent error handling and improves maintainability.

## Local Lambda Testing Flow

- Lambda backend can be tested locally before deploying it to AWS.
- A test script calls the Lambda handler directly with a mock event containing example form data.
- The Lambda function processes the event as it would in production (validation, email sending, etc.).
- The response includes statusCode and body, which can be inspected in the console.
- This allows to catch errors early without deploying to Lambda.
- Benefits: saves build time, reduces cloud usage costs, and ensures backend logic works as expected before integration with the frontend.

## to check ??

- check backend form validation after successfully was sent from front - CHECKED (succes)
- check if reCAPTCHA is working properly - CHECKED (success)
  - checked by logging console.log("reCAPTCHA response:", recaptchaData) in lambda and reading data on AWS CloudWatch

## Lambda Timeout (observed issue)

Default Lambda timeout is 3s, which was too short for my function (reCAPTCHA + SES).  
Increasing the timeout to 10s solved the issue with requests failing due to timeouts
To prevent unnoticed future timeouts, I set up a CloudWatch Alarm on the Lambda duration metric to send notifications when execution time approaches the timeout limit
