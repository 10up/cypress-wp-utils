# Cypress Utilities for WordPress

> Utilities library for WordPress E2E testing in the Cypress environment.

[![Support Level](https://img.shields.io/badge/support-beta-blueviolet.svg)](#support-level) ![WordPress latest](https://img.shields.io/badge/WordPress%20up%20to-6.2-blue) ![WordPress minimum](https://img.shields.io/badge/WordPress%20since-5.7-blue) ![Test PRs](https://github.com/10up/cypress-wp-utils/actions/workflows/cypress.yml/badge.svg) ![CodeQL](https://github.com/10up/cypress-wp-utils/actions/workflows/codeql-analysis.yml/badge.svg) [![MIT License](https://img.shields.io/github/license/10up/cypress-wp-utils.svg)](https://github.com/10up/cypress-wp-utils/blob/develop/LICENSE.md)

## Prerequisites

This library requires Cypress. Use [@10up/cypress-wp-setup](https://github.com/10up/cypress-wp-setup) to set up Cypress automatically, including this library.

## Installation

```sh
npm install @10up/cypress-wp-utils --save-dev
```

## Usage

Import the libary in `support/index.js` file:

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

### Adding a new command

This project uses `hygen` to scaffold new commands to reduce the effort of manually importing and registering new commands:

```sh
$ npx hygen cypress-command new customCommand

Loaded templates: _templates
       added: src/commands/custom-command.ts
      inject: src/index.ts
      inject: src/index.ts
      inject: src/index.ts
```

### Install the library locally

```sh
npm i -D path/to/the/library
```

### Test against every WordPress major release

For every incoming pull request by default on GitHub Actions we automatically perform tests against:
- current minimum supported WordPress 5.2
- WordPress [latest release](https://github.com/WordPress/WordPress/tags)
- current WordPress [future release](https://github.com/WordPress/WordPress/tree/master)

To run tests locally against every WordPress major release since minimum support (5.2) to the latest nightly build (e.g., 6.0-alpha) use this script:

```sh
./run-all-cores.sh
```

It has optional parameter `-s` to specify only one test suite to run:

```sh
./run-all-cores.sh -s tests/cypress/intergation/login.test.js
```

## Contributing

Please read [CODE_OF_CONDUCT.md](https://github.com/10up/cypress-wp-utils/blob/trunk/CODE_OF_CONDUCT.md) for details on our code of conduct, [CONTRIBUTING.md](https://github.com/10up/cypress-wp-utils/blob/trunk/CONTRIBUTING.md) for details on the process for submitting pull requests to us, and [CREDITS.md](https://github.com/10up/cypress-wp-utils/blob/trunk/CREDITS.md) for a list of maintainers, contributors, and libraries used in this repository.

## Support Level

**Beta:** This project is quite new and we're not sure what our ongoing support level for this will be. Bug reports, feature requests, questions, and pull requests are welcome. If you like this project please let us know, but be cautious using this in a Production environment!

## Like what you see?

[![Work with us](https://10up.com/uploads/2016/10/10up-Github-Banner.png)](http://10up.com/contact/)
