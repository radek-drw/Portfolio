Integration Test for AWS Infrastructure and Lambda Backend (DEV)
This integration test verifies the AWS infrastructure deployed via Terraform in the dev/ and the backend workflow. It covers the integration of:

API Gateway
IAM
Lambda
SES

Test Overview

**Generate reCAPTCHA token**

Make sure localhost is added in the Google reCAPTCHA console.

Run a local server in this folder using the globally installed serve package:
serve

Open the page in your browser:
http://localhost:3000/get-token.html

In the page click Get Token and the copy JSON

Once you got JSON paste it in a Thunder Client in body

**Get API_url**

run terraform apply in dev/

Copy the api_url from the Terraform outputs and paste in Thunder Client with method POST

CLick send, Once the integration test passes, the infrastructure is ready for production deployment
