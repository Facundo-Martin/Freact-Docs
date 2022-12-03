---
sidebar_position: 1
---

# Project Configuration

Configuring **[Prettier](https://prettier.io/)**, **[ESLint](https://eslint.org/)**, and **[Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)**

In this guide we will go over the following configurations:

- ESLint for catching bugs and enforcing code styles
- Prettier for formatting our codebase
- Git Hooks + Husky for automating the former ones when committing changes

## Create Next App

For obvious reasons, we are going to be using [Next.js](https://nextjs.org/).

Note that **TypeScript** and **ESLint** are supported by [create-next-app](https://nextjs.org/docs), just make sure to select **Yes** when asked if you want to include them.
We will be using npm as our package manager in this guide, but you can opt for yarn or pnpm.

The setup is pretty easy, you just need to run:

```
npx create-next-app@latest
```

After that, you can cd into your project and open it in your favorite code editor.

Your **package.json** file should look like this:

```json
// package.json
{
  "name": "freact-demo", //your project name
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@types/node": "18.11.10",
    "@types/react": "18.0.26",
    "@types/react-dom": "18.0.9",
    "eslint": "8.28.0",
    "eslint-config-next": "13.0.6",
    "next": "13.0.6",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "typescript": "4.9.3"
  }
}
```

You will also get an **.eslintrc.json** file that looks like this:

```json
// .eslintrc.json
{
  "extends": "next/core-web-vitals"
}
```

> Even though this configuration will get you up & running with ESLint, it does not enforce the codestyle and configurations we want to. Therefore, we will need to manually configure ESLint some changes to these files.

## ESLint Installation

A linter is a static code analysis tool used to flag programming errors, bugs, stylistic errors and suspicious constructs.

ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.

The first step to configure [ESLint](https://eslint.org/) is to initialize a configifuration file. This can be done with the following command:

```JavaScript
npm init @eslint/config
```

ESLint will now ask some questions to configure the project. The following approach is recommended:

1. How would you like to use ESLint?

- To check syntax only
- To check syntax and find problems
- **To check syntax, find problems, and enforce code style**

2. What type of modules does your project use?

- **JavaScript modules (import/export)**
- CommonJS (require/exports)
- None of these

We are going to choose the first option, since we will be using ES6 import/exports in our React application. If you were to build a NodeJS application, you would then choose CommonJS.

3. Which framework does your project use?

- **React**
- Vue.js
- None of these

4. Does your project use TypeScript? No / **Yes**

5. Where does your code run?

- **Browser**
- Node

6. How would you like to define a style for your project?

- **Use a popular style guide**
- Answer questions about your style

Since we are going to be using TypeScript, we will select the [Standard code style guide](https://github.com/standard/eslint-config-standard-with-typescript).

[Airbnb's code style guide](https://github.com/airbnb/javascript) is a very popular style guide for JavaScript. However, it does not support TypeScript at the moment.

7. What format do you want your config file to be in?

- JavaScript
- YAML
- **JSON**

I recommend using JSON for config files, but you can choose JavaScript or YAML if you prefer to.

After we are done with the configuration, ESLint will prompt a message with all the dependencies required

8. Would you like to install them now? No / **Yes**

9. Which package manager do you want to use?

- **npm**
- yarn
- pnpm

ESLint will proceed to install these dependencies, which you will be able to see in your **package.json** file under "devDependencies".

> Keep in mind that these are all dev dependencies. These are packages used for development purposes, but they’re not actually included in the app’s production bundle.

## ESLint Configuration

After the installation, the default configuration file will look like this:

```json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["plugin:react/recommended", "standard-with-typescript"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {}
}
```

The configuration file is fully customizable, and some developers are quite opinionated about it. Feel free to explore other configurations and [ESLint rules](https://eslint.org/docs/latest/rules/). Personally, after doing a lot of research and trying out different configurations, this is what I opted for.

I suggest you adopt this configuration and add more rules/features as you need to.

```json
// Suggested .eslintrc.json configuration
{
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  // Fix bug
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json", // tells parser relative path of tsconfig.json
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },

  // all plugins (eslint-plugin-xxx) go here:
  "plugins": [
    "@typescript-eslint",
    "@next/eslint-plugin-next", // https://github.com/vercel/next.js/blob/canary/packages/eslint-plugin-next/lib/index.js
    "prettier"
  ],

  // all configs (eslint-config-xxx) go here:
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // contains rules that specifically require type information
    "plugin:@next/next/recommended",
    "next", // awesome configration provided by Next.js, head to https://nextjs.org/docs/basic-features/eslint to learn more
    "next/core-web-vitals"
  ],
  "rules": {
    // Enforce double quotes for strings instead of single quotes (if you prefer single quotes you can omit this rule)
    "quotes": [
      "error",
      "double",
      {
        "avoidEscape": true
      }
    ],
    // Enforce double quotes for strings instead of single quotes (if you prefer single quotes you can omit this rule)
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        "avoidEscape": true
      }
    ],
    // Avoid errors when we don't import React in our components (since React 17 we don't need to)
    "react/react-in-jsx-scope": "off",
    // Avoid errors when you don't use react prop types (since we will be using TypeScript for this)
    "react/prop-types": "off",
    // Avoid errors when spreading props
    "react/jsx-props-no-spreading": "off",
    // Avoid errors when using prettier
    "prettier/prettier": ["error"],
    "no-undef": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    // Avoid errors when using next/link without an href in the anchor tag
    "jsx-a11y/anchor-is-valid": "off"
  }
}
```

Make sure to also install [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier), so you avoid the following error:

```bash
Failed to load plugin 'prettier' declared in '.eslintrc.json': Cannot find module 'eslint-plugin-prettier'
```

```
npm install eslint-plugin-prettier
```

- For additional information on rules, you can install Lintel extension for VSCode and use their GUI to further understand ESLint configuration.

## ESLint Linting

After finishing with the configuration file, **we are going to run ESLint to make sure everything is working as expected**.

```
npm run lint
```

As you run ESLint, you will notice some **errors** and **warnings** in the console. This will mostly be around quotes and other minor code style suggestions. Here is an example:

```bash
npm run lint

> testing-freact-docs@0.1.0 lint
> next lint

./pages/\_app.tsx
1:8 Error: Replace `'../styles/globals.css'` with `"../styles/globals.css";` prettier/prettier
1:8 Error: Strings must use doublequote. quotes
1:8 Error: Strings must use doublequote. @typescript-eslint/quotes
2:31 Error: Replace `'next/app'` with `"next/app";` prettier/prettier
2:31 Error: Strings must use doublequote. quotes
2:31 Error: Strings must use doublequote. @typescript-eslint/quotes
5:38 Error: Insert `;` prettier/prettier
```

**These are things you don't want to manually fix yourself one by one. Fortunately, you don't have to**.

## ESLint Fix Script

ESLint has a built-in fix feature that will fix most of these issues. We are going to add the fix script to our **package.json** file so our linter can handle them for us.

To configure the linter fix feature, we simply need to add the following script:

`"lint:fix": "next lint --fix"`

```json
// package.json
{
  "name": "freact-demo", //your project name
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix" //Adding the lint fix script
  },
  "dependencies": {
    "@types/node": "18.11.10",
    "@types/react": "18.0.26",
    "@types/react-dom": "18.0.9",
    "eslint": "8.28.0",
    "eslint-config-next": "13.0.6",
    "next": "13.0.6",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "typescript": "4.9.3"
  }
}
```

After doing this, simply run:

```
npm run lint:fix
```

**You will notice how our linter fixed these issues for us**.

```bash
npm run lint:fix

> testing-freact-docs@0.1.0 lint:fix
> next lint --fix

✔ No ESLint warnings or errors
```

> Later on, we will automate this lint and fix scripts so we don't have to manually run them while writing code and commiting changes.

## ESLint Ignore Files

Last but not least, create the file **.eslintignore** at root of project to tell ESLint which files to ignore when linting.

```
# don't ever lint node_modules
**/node_modules/*
# don't lint build output (make sure it's set to your correct build folder name)
build
# don't lint nyc coverage output
coverage
**/.next/*
*.json
*.lock
*.css
*.scss
**/out/*
next-env.d.ts
# next.config.js
```

**Congratulations! You have succesfully configured ESLint.**

## Prettier Installation

Prettier is an opinionated code formatter with support for:

- JavaScript
- TypeScript
- JSX
- Markdown
- JSON
- GraphQL
- Others

It removes all original styling and ensures that all outputted code conforms to a consistent style.

> Many developers use [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) in VSCode. However, it is recommended to have a **local prettier configuration** when building a production grade application so **the entire development team** shares the same configuration.

First, we will install Prettier locally:

```
npm install --save-dev --save-exact prettier
```

## Prettier configuration

Secondly, create a **.prettierrc** configuration in your root directory. Prettier ships with a handful of [format options](https://prettier.io/docs/en/options.html) to fully customize your experience, but here's a base configuration example:

```json
// .prettierrc file
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all"
}
```

## Prettier scripts

Now that prettier is configured, we simply need to add 2 scripts in our **package.json** file.

```json
{
  "name": "nextjs-starter",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "prettier:fix": "prettier --write .",
    "prettier:check": "prettier --check ."
  },
```

You can run these scripts manually to try them out, but we will automate these with Git Hooks + Husky.

## Prettier Ignore Files

Last but not least, create a **.prettierignore** file to let the Prettier CLI and editors know which files not to format. Here’s an example:

```
node_modules/
public/
build/
```

## Git Hooks Introduction

A [Git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) is a script that runs at different stages of the git process. These scripts trigger actions in response to specific events, so they can help you **automate your development lifecycle**. There are lots of git hooks, but in this guide **we will be primarily looking into the pre-commit hook**.

> The **pre-commit** is a hook that runs when a developer is commiting some changes. You can set up scripts that **have to run successfully** or **otherwise it will fail the commit**. The reason you set this up is to enforce code quality standards across your entire development team.

The important thing to understand is that the pre-commit hook will run before the commit. So for the commit to go through, the pre-commit has to succeed.

## Husky Installation

Many developers that use Git hooks also use [Husky](https://typicode.github.io/husky/#/) to help manage scripts. In this guide, we will be installing Husky to manage our pre-commit hook.

> Husky is a tool that helps developers work with Git hooks more efficiently and run all the scripts that need to work at various stages. By simplifying the process of setting up Git hooks, developers can create effective solutions faster.

We can install and initialize Husky with the following command:

```
npx husky-init && npm install
```

**After running this command, you will notice that a .husky folder was created at the root level of your project**.

## Husky scripts

If you head to **package.json**, you will notice that a new script was added.

```json
// package.json file
{
  "name": "testing-freact-docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "prettier:fix": "prettier --write .",
    "prettier:check": "prettier --check .",
    "prepare": "husky install" //script added during Husky installation
  },
  "dependencies": {
    "@types/node": "18.11.10",
    "@types/react": "18.0.26",
    "@types/react-dom": "18.0.9",
    "eslint-config-next": "13.0.6",
    "eslint-plugin-prettier": "^4.2.1",
    "next": "13.0.6",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^5.45.0",
    "eslint": "^8.29.0",
    "eslint-config-standard-with-typescript": "^23.0.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-n": "^15.5.1",
    "eslint-plugin-promise": "^6.1.1",
    "eslint-plugin-react": "^7.31.11",
    "prettier": "2.8.0",
    "typescript": "^4.9.3",
    "husky": "^8.0.0" //Husky dev dependency
  }
}
```

## Husky Configuration

This pre-commit hook will be responsible for checking the following:

- There are no Prettier warnings on our code
- There are no ESLint warnings on our code
- There are no TypeScript compling errors
- We can run a valid build using next build

We are going to be using a package called [lint-staged](https://www.npmjs.com/package/lint-staged). According to their description, with this package you can "Run linters against staged git files and don't let 💩 slip into your code base!
".

This means we are only run linters against staged files instead of the entire codebase. We can install it with:

```
npm install --save-dev lint-staged
```

We want to give lint-staged a pettern of files to look for.

```json
//package.json file
...
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:ci": "jest --ci",
    "lint": "next lint"
  }
 "devDependencies": {
    "husky": "^4.3.5",
    "lint-staged": "^10.5.3"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    // Run these commands against any folder and any file with the following file extensions
    // We will later fix the src output
    "**/*.{js,jsx,ts,tsx}": [
      "tsc --pretty --noEmit",
      "eslint eslint . --ext ts --ext tsx --ext js",
      "prettier --write ."
    ]
  }
```

Now all you have to do is head to .husky/pre-commit and replace the last line for `npx lint-staged`

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

We are all set! Every time you commit changes, the lint-staged scripts will run.

- **If all checks pass** your commit will go through.
- **If any checks fail** it will fail the commit, exit, and log errors.

## VSCode Settings

The last step to finish our configuration is to add some VSCode configurations to ensure the same VSCode settings are shared across the entire development team.

This is a very quick and straight forward process. We just need to create a **.vscode** folder in the root directory and add the 2 following files:

- **settings.json** (general config)
- **launch.json** (debugging config)

First, we will create the settings.json file:

```json
// settings.json
{
  // sets prettier as formatter
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // run formatter on save and/or paste
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.format": true,
    "source.organizeImports": true
  }
}
```

Secondly, we will create the **launch.json** file. Next.js provides us with a nice [debugging template](https://nextjs.org/docs/advanced-features/debugging) that we can use:

```json
// launch.json file
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

You can then head to the debugger tab in VSCode and select a debugger from the dropdown menu. You can also debug in the browser using ChromeDevTools.

## What's next?

Running ESLint, or prettier, or even tests as part of your git workflow is important because it helps you fail fast. However, it's not a replacement for CI checks. Typically, you'll want to run these commands in both environments to ensure nothing slips through.

But altogether these tools help ensure a cleaner, more consistent production codebase.
