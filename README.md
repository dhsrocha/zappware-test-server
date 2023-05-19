# Translation API

<p style="text-align: center;" align="center">
  <a href="#requirements"><b>Requirements</b></a>
  &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
  <a href="#setup-and-run"><b>Setup and Run</b></a>
  &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
    <a href="#build-profiles"><b>Build Profiles</b></a>
  &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
  <a href="#dependencies"><b>Dependencies</b></a>
  &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
  <a href="#references"><b>References</b></a>
</p>

This project repository contains the implementation of a NodeJS-based translation server.

The purpose of this server is to demonstrate the ability to quickly master the basic knowledge of Node.js as the core technology for a cloud-based back-end solution.

The server consists of a `Master` server and a `Slave` server, which communicate with each other in a master/slave setup.

## ⚙ Setup, Build and Run

### Requirements

<sup>[Back to top](#translation-api)</sup>

- [`node`](https://nodejs.org) v18.16.0 (_enforced by_ `package.json`).
- [`npm`](https://www.npmjs.com) v9.5.1 (_enforced by_ `package.json`).

### Setup and run

<sup>[Back to top](#translation-api)</sup>

To set up and run the application, use the following command:

```shell
    npm start
```

### Build Profiles

<sup>[Back to top](#translation-api)</sup>

The project includes the following build profiles:

- <details>
  <summary><code>clean</code></summary>

  Cleans the project by removing `yarn.lock`, `package-lock.json`, `node_modules`, and `build` directory.

  ```shell
  npm run clean
  ```

  </details>

- <details>
  <summary><code>compile</code></summary>

  Compiles the TypeScript code using `tsc` command.

  ```shell
  npm run compile
  ```

  </details>

- <details>
  <summary><code>format:check</code></summary>

  Checks the formatting of the code using `prettier` and `sort-package-json` commands.

  ```shell
  npm run format:check
  ```

  </details>

- <details>
  <summary><code>format:fix</code></summary>

  Fixes the formatting of the code using `prettier` and `sort-package-json` commands.

  ```shell
  npm run format:fix
  ```

  </details>

- <details>
  <summary><code>lint</code></summary>

  ```shell
  npm run lint
  ```

  Runs linting on the code using `eslint` command.

  </details>

- <details>
  <summary><code>prebuild</code></summary>

  Runs the tests before the build process.

  ```shell
  npm run prebuild
  ```

  </details>

- <details>
  <summary><code>precompile</code></summary>

  Fixes the code formatting before the compilation process.

  ```shell
  npm run precompile
  ```

  </details>

- <details>
  <summary><code>preformat:check</code></summary>

  Installs dependencies and runs security audit before checking code formatting.

  ```shell
  npm run preformat:check
  ```

  </details>

- <details>
  <summary><code>preformat:fix</code></summary>

  Installs dependencies and runs security audit before fixing code formatting.

  ```shell
  npm run preformat:fix
  ```

  </details>

- <details>
  <summary><code>prelint</code></summary>

  Compiles the TypeScript code before running the linting process.

  ```shell
  npm run prelint
  ```

  </details>

- <details>
  <summary><code>prepreview</code></summary>

  Runs linting before starting the preview.

  ```shell
  npm run prepreview
  ```

  </details>

- <details>
  <summary><code>prestart</code></summary>

  Runs linting before starting the project.

  ```shell
  npm run prestart
  ```

  </details>

- <details>
  <summary><code>pretest</code></summary>

  Runs linting before running the tests.

  ```shell
  npm run pretest
  ```

  </details>

- <details>
  <summary><code>start</code></summary>

  Starts the application using `ts-node`.

  ```shell
  npm run start
  ```

  </details>

- <details>
  <summary><code>test</code></summary>

  Runs test using `jest` command.

  ```shell
  npm run test
  ```

  </details>

- <details>
  <summary><code>test:only</code></summary>

  Runs test using `jest` command.

  ```shell
  npm run test:only
  ```

  </details>

## 📐 Architecture

### Dependencies

<sup>[Back to top](#translation-api)</sup>

- Language/architecture:
  - [Typescript](https://www.typescriptlang.org)
  - [NodeJS](https://nodejs.org)
- Server:
  - [ExpressJS](https://expressjs.com)
  - [Undici](https://undici.nodejs.org)
- Quality inspection:
  - [Prettier](https://prettier.io)
  - [ESLint](https://eslint.org)
- Test:
  - [Jest](https://jestjs.io)
  - [Supertest](https://github.com/ladjs/supertest)

### References

<sup>[Back to top](#translation-api)</sup>

- [12 Factors](https://12factor.net)
- [Microservices](https://microservices.io)
- [Open API](https://spec.openapis.org/oas/latest.html)
- [Clean Code](http://cleancoder.com/products)

---

<p style="text-align: center;" align="center">
  <sub>2023 © <a href="https://www.linkedin.com/in/dhsrocha">Diego Rocha</a></sub>
</p>
