# @org/test-infra

This is unified **testing infrastructure** for all Node.js/TypeScript microservices in Babbel.  
This package standardizes test tools, configs, and CI pipelines across teams.

- ✅ Jest for unit tests
- ✅ Supertest + Jest for integration/API tests
- ✅ Pact for contract testing
- ✅ Playwright (optional) for end-to-end tests
- ✅ Preconfigured Docker Compose + GitHub Actions CI
- ✅ One command to scaffold everything in a microservice repo

---

## Features

- **Scaffolded configs**: `jest.config.ts`, `docker-compose.test.yml`, GitHub Actions workflows
- **Preset npm scripts** for unit, integration, and contract tests
- **Optional runtime helpers** for DB reset, mocks
- **Central maintenance** by QA/DevEx team
- **Easy adoption** by any dev team

---

## Installation

In your microservice repository:

```
npm install --save-dev @org/test-infra jest supertest @pact-foundation/pact
```

## Run the CLI to scaffold test configuration files:

Run:
```
npx @org/test-infra init
```
---
- **All folder structures and config files will be created automatically**.
- **All Jest configs, Playwright configs, Pact configs etc. already live inside**: `node_modules/@org/test-infra/src/…` **— so the microservice doesn’t need to maintain them**
---

## Run tests

Run:

- `npm run test:unit` — Runs unit tests.
- `npm run test:contract` — Runs contract tests (Pact).
- `npm run test:integration:mocked` — Runs integration tests with mocked dependencies.
- `npm run test:integration:real` — Runs integration tests with real services and databases.
- `npm run test:e2e` — Runs end-to-end tests using Playwright.

## Pipeline Configuration

- **Runs unit and contract tests when started manually.**
- **On each push to a feature branch, it creates a test environment named after the branch, runs contract tests and integration tests with mocked dependencies, then sets up a full environment with all services and databases to run real integration tests.**
- **On pushes to the main branch, it runs end-to-end tests.**