# How `amplify.yml` workflow works?

- **applications:** defines one or more applications that Amplify should handle
- **appRoot: frontend** tells Amplify that the app is in the `frontend/` folder
- **phases:** define the steps in the build process
- **preBuild:** is the step before the actual build
  - first three lines:

    ```yaml
    cd ..
    npm pkg delete scripts.prepare
    cd frontend
    ```

    These lines remove the prepare script, which would normally run Husky. This is unnecessary in a CI/CD environment because Git hooks (like Husky) don’t make sense in CI/CD builds and would cause errors if executed.

    ```yaml
    npm ci --cache .npm --prefer-offline
    ```

  - **npm ci:** installs dependencies based on `package-lock.json`
  - **--cache .npm:** tells npm to use .npm folder as cache
  - **--prefer-offline:** makes npm try to use cached packages first to speed up the build

- **build:** phase where the actual app is compiled

  ```yaml
  npm run build
  ```

  runs the build script from `package.json`

- **artifacts:** defines what to deploy after the build
  - **baseDirectory:**
    ```yaml
    dist
    ```
    look in the `dist/` folder
  - **files:**

    ```yaml
    '**/*'
    ```

    include all files inside it

- **cache:** cache the `.npm` folder to speed up builds
- **buildPath:** serve the app from the domain root
