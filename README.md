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
- **Optional runtime helpers** for DB reset, mocks, fixtures (coming soon)
- **Central maintenance** by QA/DevEx team
- **Easy adoption** by any dev team

---

## Installation

In your microservice repository:

```
npm install --save-dev @org/test-infra jest supertest @pact-foundation/pact
```

## Run the CLI to scaffold test configuration files:

In your microservice repository:

```
npx org-test-init
```