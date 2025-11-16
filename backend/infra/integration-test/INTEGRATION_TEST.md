## Integration test for AWS Infrastructure and Lambda backend (DEV)

This integration test verifies the AWS infrastructure deployed via Terraform in the `infra/envs/dev/` and the backend workflow  
It covers the integration of:

- API Gateway
- IAM
- Lambda
- SES

### Test Overview

**Get api_url**

- run Terraform in `infra/envs/dev/`

  ```bash
  terraform output
  ```

- copy `api_url` and paste in Thunder Client with method POST
  > **Note**: Thunder Client is a lightweight REST API client for VS Code and can be installed from the extensions

**Generate reCAPTCHA token**

- make sure `localhost` is added in the Google reCAPTCHA console
- run a local server in the folder containing the `get-token.html` file using the `serve` npm package:

  ```bash
  serve
  ```

  > **Note**: if `serve` is not installed, it can be installed globally with:

  ```bash
  npm install -g serve
  ```

  > or run without installation using:

  ```bash
  npx serve
  ```

- open the page in browser:  
  http://localhost:3000/get-token.html
- in the page click **'Get Token'** then **'Copy JSON'**
- once the JSON is copied, paste into the request body in Thunder Client
- click **'Send'**, the test is successful if a **`{success: true}`** response is returned and the test email is delivered via **SES**  
  Once confirmed, the infrastructure is ready for production deployment
