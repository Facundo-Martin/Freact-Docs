---
sidebar_position: 2
---

# CI/CD Pipelines

Writing CI/CD pipeline workflows with Github Actions

Creating a continuous integration and continuous deployment (CI/CD) pipeline for your Next.js project can greatly improve the efficiency and reliability of your development process. By automating the building, testing, and deployment of your project, you can save time and ensure that your code is always in a deployable state. In this article, we will walk through the steps to set up a CI/CD pipeline for a Next.js project using Github Actions.

To get started, you will need to have your Next.js project already pushed to a Github repository. You will also need to have Node.js and npm installed on your local machine.

1. We will create a file named .github/workflows/ci-cd.yml in the root directory of your project. This file will contain the configuration for your [Github Actions](https://docs.github.com/en/actions) workflow. In this file, add the following code:

```yml
name: CI/CD
on: [push]
jobs:
build-and-test:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v2 - name: Use Node.js
uses: actions/setup-node@v1
with:
node-version: 12.x - name: Install dependencies
run: npm install - name: Build and test
run: npm run build && npm test
```

This configuration file tells Github Actions to run the npm run build && npm test command whenever a new commit is pushed to the repository. This command will build your Next.js project and run any tests you have set up.

2. To set up continuous deployment, we need to add another step to the build-and-test job in the .github/workflows/ci-cd.yml file. Add the following code after the build and test step:

```yml
- name: Deploy
  if: success()
  uses: JamesIves/github-pages-deploy-action@3.7.1
  with:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  BRANCH: gh-pages
  FOLDER: public
```

This step will use the github-pages-deploy-action to deploy your built Next.js project to the gh-pages branch of your Github repository. The public directory, which is where Next.js outputs the built files, will be deployed to the gh-pages branch.

3. Next, we need to add a script to the scripts section of your package.json file that builds your Next.js project. Add the following code to the scripts section:

```
"build": "next build"
```

4. Finally, we need to add a homepage property to the package.json file to specify the URL where your project will be deployed. Add the following code to your package.json file:

```yml
"homepage": "https://<your-github-username>.github.io/<your-repository-name>"
```
