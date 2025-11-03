⚠️ Before running any Terraform commands in this directory, make sure the backend is initialized:

1. Navigate to `backend-setup/`:

   ```bash
   cd backend-setup
   terraform init
   terraform apply
   ```

   (This will create the remote backend resources in S3/DynamoDB)

2. Go back to the main directory and run:
   ```bash
   terraform init
   ```
