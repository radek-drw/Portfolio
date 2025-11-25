## Backend Setup

Folder `backend-setup/` is used only once to create the Terraform backend resources (S3 bucket + DynamoDB table).
These resources store (S3) and lock (DynamoDB) the Terraform state file. It’s important that all developers have access to exactly the same state file.

### Setup:

- Initialize Terraform and create backend resources:
  ```bash
  terraform init
  terraform apply
  ```
- Once the resources are created, navigate to the folder containing `backend.tf` file and run:
  `terraform init`
  (optionally, use `terraform init -migrate-state` only if a local state exists and needs to be migrated to the S3 backend)

This will initialize the Terraform state to use the remote backend (S3), or migrate the local state if it exists.

⚠️ **Important:** do not run terraform apply again in this folder — the backend resources already exist and should only be created once.

After the backend is created, local state `terraform.tfstate` and working files `.terraform/` are no longer needed — they take up space and can cause conflicts (e.g., if another developer has a local state file and accidentally modifies backend data).
The state file `terraform.tfstate` is intentionally removed so that the next `terraform init` creates a clean, new state.

After each completed `apply`, run:
⚠️ **Important:** execute this command in the `backend-setup/` folder

```bash
rm -rf .terraform .terraform.lock.hcl terraform.tfstate terraform.tfstate.backup
```

All future backend changes should be performed only by the DevOps responsible, who has access to the backend resources (S3 and DynamoDB), reducing the risk of conflicts.
