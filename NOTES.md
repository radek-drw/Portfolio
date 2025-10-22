## Local Lambda Testing Flow

- Lambda backend can be tested locally before deploying it to AWS
- A test script calls the handler with a sample event
- The Lambda function processes the event as it would in production (validation, email sending, etc.).
- The response includes statusCode and body, which can be inspected in the console.
- This helps catch errors early, saving time and cloud costs
- Benefits: saves build time, reduces cloud usage costs, and ensures backend logic works as expected before integration with the frontend.

## Cache DOM elements

All required form elements are selected and stored in variables once on DOMContentLoaded. This approach:

- avoids repeated calls to `document.getElementById` / `querySelector` during validation and error handling
- improves performance by reducing DOM lookups
- keeps the code shorter, cleaner, and easier to maintain

## GitHub Actions Workflows

I created two GitHub Actions workflows to automate checks and builds in my project

1.  Pull Request → Main (Production Branch)

    This workflow is triggered whenever a pull request targets the `main` branch (the production branch)  
    The workflow performs the following steps:
    - Installs all required dependencies:
      - root dependencies (ESLint with its plugins, Prettier)
      - Frontend dependencies (all packages needed to build the app)

    - Builds the project and checks for any errors

    The purpose of this workflow is to ensure that any code merged into the main branch is properly linted, formatted, and error-free.

2.  Push → Dev (Testing Branch)

    This workflow is almost identical to the one described above, except it:
    - triggers on push events to the `dev` branch
    - runs only when the latest commit message contains `[test]`:

    ```yaml
    if: contains(github.event.head_commit.message, '[test]')
    ```

    This setup allows me to safely test workflow changes without creating unnecessary pull requests to the main branch.  
    Once the tests pass successfully, the updated configuration can be copied to the main CI workflow
