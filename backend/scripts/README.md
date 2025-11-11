# Local Backend Testing

This document describes local tests for backend Lambda functions. These tests allow to verify logic locally in Node.js without deploying to AWS.

## Why Local Testing?

- ⚡ **Fast:** runs instantly without deployment
- 💸 **Cost-free:** no AWS usage
- 🪶 **Easy to debug:** inspect console output or use breakpoints
- ✅ **Safe:** does not affect live AWS resources

> Local tests verify backend logic (validation, email sending, etc.) and skip external integrations like API Gateway, IAM, or real reCAPTCHA. Full integration tests live in terraform/envs/dev

---

## 1. `sendContactForm` Local Test

**Script:** `invoke-sendContactForm.local.js`

**Purpose:**

- Test Lambda logic for handling contact form submissions
- Validate inputs, send emails via SES
- Skip API Gateway, IAM, and real reCAPTCHA

**Advantages:**

- ⚡ Fast execution
- 💸 Cost-free
- 🪶 Easy to debug

---

## 2. `reportProblem` Local Test

**Script:** `invoke-reportProblem.local.js`

**Purpose:**

- [Describe what this Lambda does]
- [Mention what is tested locally and what is skipped]

**Advantages:**

- ⚡ [Fast]
- 💸 [Cost-free]
- 🪶 [Easy to debug]
