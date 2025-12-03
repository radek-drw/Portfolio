⚠️ Before running any Terraform commands in `envs/dev` or `env/prod` directory, make sure the backend is initialized. This includes:

- `DynamoDB` for state locking, so only one person can apply changes at a time
- `S3` for remote state storage (terraform.tfstate)

To initilalize backend navigate to `bootstrap/` directory and run:

```bash
terraform init
terraform apply
```

After backend has been initialized, Terraform commands can be run in the `envs/dev` or `envs/prod` directories.

### Clean Up Local Backend Files

After the backend resources are created, the local backend-related files generated during the bootstrap step are no longer needed.
They can be safely removed by running:

```bash
rm -rf .terraform .terraform.lock.hcl terraform.tfstate terraform.tfstate.backup
```
