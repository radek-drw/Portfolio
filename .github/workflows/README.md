## GitHub Actions Workflows

This project includes two GitHub Actions workflows for automated quality checks and builds

1.  Pull Request → `main` (Production)
    Triggered when a pull request targets the main branch.
    It:
    - installs all root and frontend dependencies
    - runs ESLint and Prettier checks
    - builds the frontend to ensure error-free code

    Purpose: Verify that code merged into main is linted, formatted, and buildable.

2.  Push → `dev` (Workflow Testing)

    Triggered on pushes to the dev branch only if the latest commit message contains [test]:

    ```yaml
    if: contains(github.event.head_commit.message, '[test]')
    ```

    This workflow mirrors the production CI but is used to safely test workflow changes without creating pull requests to main.
    Once the test run succeeds, the verified configuration can be copied to the main workflow.
