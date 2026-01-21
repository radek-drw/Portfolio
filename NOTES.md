## TO DO

1. add locks i dynamodb for terraform state and add s3 versioning - [x]
2. terraform - write documentation about adding, removing, editing, reading secrets in AWS SSM - [ ]
3. change api name to dev-portoflio-api - [ ]
4. .github\workflows\README.md - change descritpion when ci-quality-check finished - [ ]
5. think to use pnpm while projects gets bigger - [x]
6. add to README.md - project uses pnpm package manager instead of npm, to enable pnpm run `corepack enable pnpm` in PowerShell as Administrator. Corepack is used for package manager (pnpm) version control, (starting with Node.js 25, Corepack must be installed as a separate package) - [ ]
7. add to README.md - running `npm install` is intentionally blocked and will fail. Use `pnpm install` instead - [ ]
8. find or try to build own solution - how to protect using 'npm install' while pnpm is used in project - [ ]

## ISSUES

1. switching from npm to pnpm due to issues with workspaces when installing dependencies in the CI workflow (root - eslint, prettier)
   Advantages: no versions conflicts
2. how prevent using 'npm install xyz' due to conflicts with pnpm

nanoid, lodash, allow-only

## CLEAN NPM

rm -rf node_modules frontend/node_modules backend/node_modules
rm -f package-lock.json
npm cache clean --force

## CLEAN PNPM

rm -rf node_modules frontend/node_modules backend/node_modules
rm -f pnpm-lock.yaml
pnpm store prune
