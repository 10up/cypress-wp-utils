# cypress-wp-utils

![WordPress latest](https://img.shields.io/badge/WordPress%20up%20to-6.0-blue) ![WordPress minimum](https://img.shields.io/badge/WordPress%20since-5.2-blue) ![Test PRs](https://github.com/10up/cypress-wp-utils/actions/workflows/cypress.yml/badge.svg) ![CodeQL](https://github.com/10up/cypress-wp-utils/actions/workflows/codeql-analysis.yml/badge.svg)

> Utilities library for WordPress E2E testing in the Cypress environment.

## Prerequisites

This library requires Cypress. Use https://github.com/10up/cypress-wp-setup to set up Cypress automatically.

## Installation

```sh
npm i "https://github.com/10up/cypress-wp-utils#build" -D
```

## Usage

Just import the libary in `support/index.js` file then you're ready:

```js
// tests/cypress/support/index.js
import '@10up/cypress-wp-utils';
```

Documentation for commands can be found at https://10up.github.io/cypress-wp-utils/.

### IntelliSense and code completion for Cypress commands

Add a `tsconfig.json` file into the cypress folder to enable code completion for both Cypress built-in commands and commands from this library:

```js
{
  "compilerOptions": {
    "allowJs": true,
    "types": ["cypress"]
  },
  "include": ["**/*.*"]
}
```

## Contributing

### Adding new command

This project use `hygen` to scaffold new command to reduce the effort of manually importing and registering new commands:

```sh
$ npx hygen cypress-command new customCommand

Loaded templates: _templates
       added: src/commands/custom-command.ts
      inject: src/index.ts
      inject: src/index.ts
      inject: src/index.ts
```

### Install the the library locally

```sh
npm i -D path/to/the/library
```
