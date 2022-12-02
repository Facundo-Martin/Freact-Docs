---
sidebar_position: 1
---

# Project Configs

Configuring **[Prettier](https://prettier.io/)**, **[ESLint](https://eslint.org/)**, and **[Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)**

We will use Prettier for formatting and ESLint for catching bugs and enforcing code styles.

## Initializing a Next.js app

hacer despues

## ESLint Installation

A linter is a static code analysis tool used to flag programming errors, bugs, stylistic errors and suspicious constructs.

ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.

## ESLint Scripts

```json
// package.json file
{
  "name": "freact-demo",
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

```json
// .eslintrc.json file
{
  "extends": "next/core-web-vitals"
}
```

Even though this configuration will get you up & running with ESLint, it does not enforce the codestyle and configurations we want to. Therefore, we will need to make some changes to these files.

## ESLint Configuration

This is the config file

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    // If we are using Jest testing library
    "jest":true
  },
//   Extend current configuration to other configurations (test out later)
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:@next/next/recommended",
    "prettier",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    // So that ESLint works while compiling and transpiling TypeScript
    "project": "./ts.config.json"
  },
  //Make sure to have prettier at the end of the array so it overrides all the previous plugins
  "plugins": ["react", "testing-library", "prettier"],
  "overrides": [
    // Only uses Testing Library lint rules in test files
    {
      "files": [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
      ],
      "extends": ["plugin:testing-library/react"]
    }
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
    ]
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

For additional information on rules, you can install Lintel on VSCode and use their GUI to further understand ESLint configuration.

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

Many developers use Prettier extension in VSCode. However, it is recommended to have a local prettier configuration when building a production grade application.

First, install Prettier locally:

```
npm install --save-dev --save-exact prettier
```

Next, create a .prettierignore file to let the Prettier CLI and editors know which files to not format. Here’s an example:

```
node_modules/
public/
build/
```

## Prettier scripts

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

You can run these scripts manually to try them out, but after installing ESLint we will automate these with Git Hooks + Husky.

## Prettier configuration

Last but not least, create a **.prettierrc** configuration file to fully customize your experience. Prettier ships with a handful of [format options](https://prettier.io/docs/en/options.html) to fully customize your experience, but here's a base configuration example:

```json
{
"printWidth": 80
"tabWidth": 2,
"useTabs":false,
"semi": true,
"singleQuote": false,
"trailingComma": "all"
}
```

If you are using VSCode, make sure to go to Settings > Formatter and select Prettier as your Default Formatter. You will also want to enable the "Format on Save" option

## Git Hooks + Husky

[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) are shell scripts found in the hidden .git/hooks directory of a Git repository. These scripts trigger actions in response to specific events, so they can help you **automate your development lifecycle**. There are lots of git hooks, but in this guide we will be primarily looking into the pre-commit hook.

The **pre-commit** hook is run first, before you even type in a commit message. It’s used to inspect the snapshot that’s about to be committed, to see if you’ve forgotten something, to make sure tests run, or to examine whatever you need to inspect in the code.

You can do things like check for code style (run lint or something equivalent), check for trailing whitespace (the default hook does exactly this), or check for appropriate documentation on new methods.

The important thing to understand is that the pre-commit hook will run before the commit. So for the commit to go through, the pre-commit has to succeed.

## Husky

husky-init is a one-time command to quickly initialize a project with husky.

```
npx husky-init && npm install
```

After running this command, you will notice that a .husky folder was created with a pre-commit file in it.

## Husky scripts

lint-staged allows you to only run thes commands when certain files are being staged or committed

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
    "src/**/*.{ts,tsx}": [
      "yarn eslint",
      "yarn lint --fix",
      "yarn prettier --write",
      "yarn test"

    ]
  }
```

We're also gonna take a look at the post-merged hook

## What's next?

Running ESLint, or prettier, or even tests as part of your git workflow is important because it helps you fail fast. However, it's not a replacement for CI checks. Typically, you'll want to run these commands in both environments to ensure nothing slips through.

But altogether these tools help ensure a cleaner, more consistent production codebase. Long term, that's a big win for any project.

- Read the [official documentation](https://docusaurus.io/)
- Modify your site configuration with [`docusaurus.config.js`](https://docusaurus.io/docs/api/docusaurus-config)
- Add navbar and footer items with [`themeConfig`](https://docusaurus.io/docs/api/themes/configuration)
- Add a custom [Design and Layout](https://docusaurus.io/docs/styling-layout)
- Add a [search bar](https://docusaurus.io/docs/search)
- Find inspirations in the [Docusaurus showcase](https://docusaurus.io/showcase)
- Get involved in the [Docusaurus Community](https://docusaurus.io/community/support)
