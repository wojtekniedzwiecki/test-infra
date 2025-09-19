import type { Config } from '@jest/types';

const unit: Config.InitialOptions = {
    displayName: 'unit',
    testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
    preset: 'ts-jest',
};

const integrationMocked: Config.InitialOptions = {
    displayName: 'integration-consumer',
    testMatch: ['<rootDir>/tests/integration/consumer/**/*.test.ts'],
    preset: 'ts-jest',
    setupFilesAfterEnv: [
        '<rootDir>/node_modules/@org/test-infra/src/setup/jest.setup.mocks.ts',
    ],
};

const integrationReal: Config.InitialOptions = {
    displayName: 'integration-provider',
    testMatch: ['<rootDir>/tests/integration/provider/**/*.test.ts'],
    preset: 'ts-jest',
    setupFilesAfterEnv: [
        '<rootDir>/node_modules/@org/test-infra/src/setup/jest.setup.provider.ts',
    ],
    globalTeardown:
        '<rootDir>/node_modules/@org/test-infra/src/setup/global-teardown.ts',
};

const contract: Config.InitialOptions = {
    displayName: 'contract',
    testMatch: ['<rootDir>/tests/contract/**/*.test.ts'],
    preset: 'ts-jest',
};

const e2e: Config.InitialOptions = {
    displayName: 'e2e',
    testMatch: ['<rootDir>/tests/e2e/**/*.test.ts'],
    preset: 'ts-jest',
};

module.exports = {
    projects: [unit, integrationMocked, integrationReal, contract, e2e],
};
