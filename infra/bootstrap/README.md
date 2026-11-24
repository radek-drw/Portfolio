# Terraform Bootstrap

### Contents

- [Terraform Bootstrap](#terraform-bootstrap)
    - [Contents](#contents)
  - [Terraform State Bucket](#terraform-state-bucket)
    - [Purpose](#purpose)
    - [Initial Setup](#initial-setup)
      - [1. Create the S3 Bucket](#1-create-the-s3-bucket)
      - [2. Migrate state to S3](#2-migrate-state-to-s3)
  - [GitHub Actions IAM](#github-actions-iam)
    - [Purpose](#purpose-1)

## Terraform State Bucket
### Purpose
Creates the S3 bucket used to store Terraform state files

### Initial Setup
Since the bootstrap configuration also uses this bucket to store its own state, the initial setup requires two steps:

#### 1. Create the S3 Bucket

Temporarily comment out the S3 backend configuration in `backend.tf`.  
Initialize Terraform using the local backend and create the bucket:

```bash
terraform init
terraform apply
```

Terraform temporarily stores the bootstrap state locally in `terraform.tfstate`

#### 2. Migrate state to S3

Uncomment the S3 backend configuration in `backend.tf`  
Migrate the local state to S3:

```
terraform init -migrate-state
```

Verify that the state exists in S3:

```bash
aws s3 ls s3://radek-portfolio-terraform-state/bootstrap
```

After successful verification, remove the temporary local state files:

```bash
rm -f terraform.tfstate terraform.tfstate.backup
```
Notes:
- S3 bucket versioning is enabled
- S3 native state locking is enabled with `use_lockfile = true`
- The bootstrap process only needs to be performed once

## GitHub Actions IAM
### Purpose
Creates IAM roles for GitHub Actions to access AWS

- Follows the Least Privilege principle, granting only the permissions required by Terraform
- Permissions were identified and verified through manual testing and AWS CloudTrail analysis
- IAM roles and policies must be created using `terraform apply` before running GitHub Actions workflows