## INSTALLATION

Please make sure the release file is unpacked under a Web-accessible
directory. You shall see the following files and directories:

        public/
        __tests__
        src/
        README
        package.json
        tsconfig.json
        vite.config.js

## REQUIREMENTS

Platform: cross-platform solution, linux, windows, macOS, other.

Programming language used React JS / TypeScript

The service uses the following technologies:

        node -v version 18.13.0 and yarn 1.22.19
        nvm current version 0.39.1

## BASE DEPENDENCIES

        typescript
        vite
        mobx to dispatch asynchronous actions.
        react-router fully-featured routing library for the React JavaScript library
        react-router-dom fully-featured routing library for the React JavaScript library
        antDesign & scss & sass for component styling
        jest for testing components react-testing-library
        moment for encoding dates

## QUICK START

        clone EV-dashboard project from gitlab repository git@gitlab.com:ev-chargers-ui/ev-dashboard.git
        cd ev-dashboard

## ABSOLUTE IMPORTS CONFIGURATION

In this project, we've set up a convenient absolute import system to make our imports cleaner and more readable. Instead of using relative paths like `../../components/Button`, you can use the following syntax:

```javascript
import Button from '~/components/Button';

Next:

        RUN yarn/npm install
        RUN yarn/npm run dev
        RUN yarn/npm execute-husky

For testing:

        Run yarn/npm test -- -u   

## UPDATE RESULTS

V1.0.0 version, 04-10-2023
