## Integration test for AWS Infrastructure and Lambda backend (DEV)

This integration test verifies the AWS infrastructure deployed via Terraform in the dev/ and the backend workflow  
It covers the integration of:

- API Gateway
- IAM
- Lambda
- SES

### Test Overview

**Generate reCAPTCHA token**

- make sure localhost is added in the Google reCAPTCHA console
- run a local server in this folder using `serve` npm package:

  ```bash
  serve
  ```

  **Tip**: if `serve` is not installed, it can be installed globally with:

  ```bash
  npm install -g serve
  ```

  or run without installation using:

  ```bash
  npx serve
  ```

- open the page in browser:  
  http://localhost:3000/get-token.html
- in the page click 'Get Token' then 'Copy JSON'
- once the JSON is obtained, paste into the request body in Thunder Client

  > **Note**: Thunder Client is a lightweight REST API client for VS Code and can be installed from the Extensions

**Get API_url**

run terraform apply in dev/

Copy the api_url from the Terraform outputs and paste in Thunder Client with method POST

CLick send, Once the integration test passes, the infrastructure is ready for production deployment
