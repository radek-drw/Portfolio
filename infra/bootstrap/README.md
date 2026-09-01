# Terraform S3 Backend Bootstrap — Quick Guide

When Terraform uses S3 bucket as its backend, the bucket must already exist **before** Terraform can initialize the S3 backend.

## The solution: Bootstrap in two phases

### Phase 1 — Use the local backend

Temporarily comment out the S3 backend configuration:

```hcl
# terraform {
#   backend "s3" {
#     bucket       = "my-terraform-state-bucket"
#     key          = "bootstrap/terraform.tfstate"
#     region       = "eu-west-1"
#     use_lockfile = true
#     encrypt      = true
#   }
# }
```

Run:

```bash
terraform init
terraform apply
```

Terraform uses the default **local backend** and creates the S3 bucket.

The Terraform state is temporarily stored locally:

```text
terraform.tfstate
```

### Phase 2 — Move state to S3

Once the bucket exists, uncomment the S3 backend configuration:

```
terraform {
  backend "s3" {
    bucket       = "my-terraform-state-bucket"
    key          = "bootstrap/terraform.tfstate"
    region       = "eu-west-1"
    use_lockfile = true
    encrypt      = true
  }
}
```

Then run:

```
terraform init -migrate-state
```

Terraform migrates the existing local state to S3.

From this point onward, Terraform uses S3 as the backend.

### Phase 3 — Remove the local state

After confirming that the state exists in S3 and Terraform works correctly, manually delete the local state file:

```
terraform.tfstate
```

Also check for:

```
terraform.tfstate.backup
```

and remove it if it is no longer needed
