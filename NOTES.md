## Local Lambda Testing Flow

- Lambda backend can be tested locally before deploying it to AWS
- A test script calls the handler with a sample event
- The Lambda function processes the event as it would in production (validation, email sending, etc.).
- The response includes statusCode and body, which can be inspected in the console.
- This helps catch errors early, saving time and cloud costs
- Benefits: saves build time, reduces cloud usage costs, and ensures backend logic works as expected before integration with the frontend.

## Cache DOM elements

Instead of calling `document.getElementById` or `querySelector` multiple times
during validation and error handling, I now cache all DOM elements once inside
`DOMContentLoaded`. This improves performance (fewer DOM lookups), reduces
repeated code, and makes the script easier to maintain
