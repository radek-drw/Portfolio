# How `amplify.yml` workflow works?

- **applications** defines one or more applications that Amplify should handle
  - **appRoot: frontend** tells Amplify that the app is in the `frontend/` folder
    - **phases** define the steps in the build process
      - **preBuild** is the step before the actual build

        ```yaml
        npm ci --cache .npm --prefer-offline
        ```

        - **npm ci** installs dependencies based on `package-lock.json`
        - **--cache** .npm tells npm to use .npm folder as cache
        - **--prefer-offline** makes npm try to use cached packages first to speed up the build

      - **build** phase is where the actual app is compiled
        - **npm run build** runs the build script from `package.json`

    - **artifacts** tells Amplify what files to deploy after the build
      - **baseDirectory: dist** means Amplify will look in the dist folder for the build output
      - **files**: `"**/*"` means all files in the dist folder will be deployed
    - **cache** specifies which files should be cached between builds to speed things up
      - **.npm** folder (where npm stores downloaded packages) is cached, so Amplify doesn’t need to re-download everything every time

  - **buildPath** serves the app from the root of the domain
