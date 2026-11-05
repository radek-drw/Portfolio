## TO DO

1. [x] add locks in dynamodb for terraform state and add s3 versioning (this dynamodb locking was replaced with S3 `use_lockfile`)
2. [ ] terraform - write documentation about adding, removing, editing, reading secrets in AWS SSM
3. [x] migrate to `pnpm` as the project grows to avoid dependency conflicts
4. [ ] add to README.md - project uses pnpm package manager instead of npm, to enable pnpm run `corepack enable` in PowerShell as Administrator. Corepack is used for package manager (pnpm) version control, (starting with Node.js 25, Corepack must be installed as a separate package)
5. [ ] add to README.md - running `npm install` is intentionally blocked and will alway fail, `preinstall` script using `only-allow` enforces it. Project requires `pnpm`
6. [ ] find or try to build own solution - how to protect using `npm install` while pnpm is used in project, `only-allow` package doesn't give clear message
7. [x] add .node-version to keep the same Node version for all devs and CI
8. [ ] add to README.md how to setup `fnm` (Node version manager). Install fnm `choco install fnm`, configure bash `code ~/.bashrc` - add `eval "$(fnm env --use-on-cd --shell bash)"`, run `fnm use` to install version
9. [ ] add script `postinstall` to `package.json` that checks if tools like tflint, terraform-docs, lazygit, nvm, ggshield etc are in project and if not instruction how to install (win, macos, linux)
10. [x] change date in footer 2025->2026 (automatic using JS)
11. [ ] fix readme in infra/bootstrap according OIDC
12. [x] remove Lambda locals from envs/dev, keep `lambda_name` in the contact-form stack because Lambda and IAM share it
13. [ ] IAM users -> create by terraform not in console
14. [ ] add readme to infra/bootstrap with explanation of responsibility od files
15. [ ] add setup.sh for instalation and initialization
16. [ ] change documentation Adding New Lambda (now includes github actions)
17. [ ] when lambda removed it also should be removed from s3 lmabda artifacts
18. [ ] **ONE GLOBAL INSTALL OF NODE(choco) + ENGINES(package.json)**
19. [ ] add 'www' subdomain do production
20. [ ] AWS Budgets - add to terraform (infra/globa)
21. [ ] CloudWatch Alarm na Errors, SNS Topic send alerts

## ISSUES

1. switching from npm to pnpm due to issues with workspaces when installing dependencies in the CI workflow (root - eslint, prettier)
   Advantages: no versions conflicts
2. how prevent using 'npm install xyz' due to conflicts with pnpm

**-----------------------------------------------------------------**

## CLEAN NPM

rm -rf node_modules frontend/node_modules backend/node_modules
rm -f package-lock.json
npm cache verify
npm cache clean --force
remove 'npm-cache' - C:\Users\rdrwe\AppData\Local
remove 'npm' - C:\Users\rdrwe\AppData\Roaming
add to .gitignore 'package-lock.json'

## CLEAN PNPM

corepack disable
rm -rf node_modules frontend/node_modules backend/node_modules
rm -f pnpm-lock.yaml
pnpm store prune
remove 'pnpm', 'pnpm-cache', 'pnpm-state' - C:\Users\rdrwe\AppData\Local

## NODE.JS uninstall

## Checklist: Migration from npm to pnpm

git grep -w -l npm
git grep -l npx
git grep package-lock
git grep "npm install"
