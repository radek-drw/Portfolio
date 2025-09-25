<!-- ## Form Validation Flow

- The form has two layers of validation: **frontend** and **backend**.
- Once the frontend validation passes, the backend applies the same validation rules for consistency.
- If validation fails on the backend, it responds with status code **400** and an error object.
- Errors are returned as codes (e.g., `{ name: "REQUIRED" }`, `{ email: "INVALID" }`).
- On the frontend, the function `showBackendValidationErrors` checks for these errors.
- If an error exists, the function uses the same error message mapping as the frontend validation.
- This ensures consistent error handling and improves maintainability. -->

## Local Lambda Testing Flow

- Lambda backend can be tested locally before deploying it to AWS.
- A test script calls the Lambda handler directly with a mock event containing example form data.
- The Lambda function processes the event as it would in production (validation, email sending, etc.).
- The response includes statusCode and body, which can be inspected in the console.
- This allows to catch errors early without deploying to Lambda.
- Benefits: saves build time, reduces cloud usage costs, and ensures backend logic works as expected before integration with the frontend.

<!-- ## Lambda Timeout (observed issue)

Default Lambda timeout is 3s, which was too short for the function (reCAPTCHA + SES)
When the execution exceeded 3 s, the Lambda was terminated before it could return a response to API Gateway. As a result, API Gateway returned an error to the client — even though the Lambda sometimes still managed to send the email via SES. Increasing the timeout to 10s solved the issue with requests failing due to timeouts
To prevent unnoticed future timeouts, I set up a CloudWatch Alarm on the Lambda duration metric to send notifications when execution time approaches the timeout limit -->

## Git Branch Workflow (Main / Dev)

Work daily on **`dev`** branch for all changes and keep **`main`** stable for production. Use `git checkout` to switch branches and `git merge` to combine changes from `dev` into `main`. On AWS Amplify, only **`main`** is connected with auto-build, so deploying happens automatically from `main`

## Cache DOM elements

Instead of calling `document.getElementById` or `querySelector` multiple times
during validation and error handling, I now cache all DOM elements once inside
`DOMContentLoaded`. This improves performance (fewer DOM lookups), reduces
repeated code, and makes the script easier to maintain
