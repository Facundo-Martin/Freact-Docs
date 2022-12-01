---
sidebar_position: 1
---

# Project Configs

Configuring **[Prettier](https://prettier.io/)**, **[ESLint](https://eslint.org/)**, and **[Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)**

## ESLint Installation

ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.

The first step to configure eslint is to initialize a configifuration file. This can be done from the CLI with the following command:

```JavaScript
npm init @eslint/config
```

ESLint will now ask some questions to configure the project. The following approach is recommended:

1. How would you like to use ESLint?

- To check syntax only
- To check syntax and find problems
- **To check syntax, find problems, and enforce code style**

We are going to choose the latter, enforcing [Airbnb code style](https://github.com/airbnb/javascript). This way we are guaranteed to have a consistent codebase and improve the software development process as well as developer experience.

2. What type of modules does your project use?

- **JavaScript modules (import/export)**
- CommonJS (require/exports)
- None of these

We are going to choose the first option, since we will be using ES6 import/exports in our React application. If you were to build a NodeJS application, you would then choose CommonJS.

3. Which framework does your project use?

- **React**
- Vue.js
- None of these

Not much to add here. This is a React guide after all...

4. Does your project use TypeScript? No / **Yes**

Using TypeScript is highly recommended. You can refer to the TypeScript Guide in the Tech Stack section of this documentation.

5. Where does your code run?

- **Browser**
- Node

Again, we are building a web application with React after all.

6. How would you like to define a style for your project?

- **Use a popular style guide**
- Answer questions about your style

We are going to use [Airbnb's code style guide](https://github.com/airbnb/javascript), but feel free to explore other options.

7. What format do you want your config file to be in?

- JavaScript
- YAML
- **JSON**

This is probably just a matter of personal preference, but I recommend using JSON for config files.

After we are done with the configuration, ESLint will prompt a message with all the dependencies required

copiar aca eso cuando lo haga

Would you like toinstall these now with npm? No / **Yes**

Keep in mind that these are all dev dependencies, they will not be shipped into the browser. You might also want to install [eslint-config-airbnb-typescript
](https://www.npmjs.com/package/eslint-config-airbnb-typescript), which enhances Airbnb's ESLint config with TypeScript support.

```
npm install eslint-config-airbnb-typescript --save-dev
```

After we install the dependencies, we can head to our package.json file and check them out.

## ESLint Configuration

- Read the [official documentation](https://docusaurus.io/)
- Modify your site configuration with [`docusaurus.config.js`](https://docusaurus.io/docs/api/docusaurus-config)
- Add navbar and footer items with [`themeConfig`](https://docusaurus.io/docs/api/themes/configuration)
- Add a custom [Design and Layout](https://docusaurus.io/docs/styling-layout)
- Add a [search bar](https://docusaurus.io/docs/search)
- Find inspirations in the [Docusaurus showcase](https://docusaurus.io/showcase)
- Get involved in the [Docusaurus Community](https://docusaurus.io/community/support)

## What's next?

- Read the [official documentation](https://docusaurus.io/)
- Modify your site configuration with [`docusaurus.config.js`](https://docusaurus.io/docs/api/docusaurus-config)
- Add navbar and footer items with [`themeConfig`](https://docusaurus.io/docs/api/themes/configuration)
- Add a custom [Design and Layout](https://docusaurus.io/docs/styling-layout)
- Add a [search bar](https://docusaurus.io/docs/search)
- Find inspirations in the [Docusaurus showcase](https://docusaurus.io/showcase)
- Get involved in the [Docusaurus Community](https://docusaurus.io/community/support)
