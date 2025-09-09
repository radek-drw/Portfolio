## Form Validation Flow

- The form has two layers of validation: **frontend** and **backend**.
- Once the frontend validation passes, the backend applies the same validation rules for consistency.
- If validation fails on the backend, it responds with status code **400** and an error object.
- Errors are returned as codes (e.g., `{ name: "REQUIRED" }`, `{ email: "INVALID" }`).
- On the frontend, the function `showBackendValidationErrors` checks for these errors.
- If an error exists, the function uses the same error message mapping as the frontend validation.
- This ensures consistent error handling and improves maintainability.
