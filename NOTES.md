## Local Lambda Testing Flow

- Lambda backend can be tested locally before deploying it to AWS
- A test script calls the handler with a sample event
- The Lambda function processes the event as it would in production (validation, email sending, etc.).
- The response includes statusCode and body, which can be inspected in the console.
- This helps catch errors early, saving time and cloud costs
- Benefits: saves build time, reduces cloud usage costs, and ensures backend logic works as expected before integration with the frontend.

## Cache DOM elements

All required form elements are selected and stored in variables once on DOMContentLoaded. This approach:

- avoids repeated calls to `document.getElementById` / `querySelector` during validation and error handling
- improves performance by reducing DOM lookups
- keeps the code shorter, cleaner, and easier to maintain

## to do

1. add locks i dynamodb for terraform state and add s3 versioning
