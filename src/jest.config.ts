import { defineConfig } from 'ts-jest';

const reporters = [
    "default",
    ["jest-junit", { outputDirectory: "./reports/junit", outputName: "results.xml" }],
];

export default defineConfig({
    projects: [
        {
            displayName: 'unit',
            testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
            preset: 'ts-jest',
            reporters,
        },
        {
            displayName: 'integration-mocked',
            testMatch: ['<rootDir>/tests/integration/mocked/**/*.test.ts'],
            preset: 'ts-jest',
            setupFilesAfterEnv: [
                '<rootDir>/node_modules/@org/test-infra/src/setup/jest.setup.mocks.ts',
            ],
            reporters,
        },
        {
            displayName: 'integration-real',
            testMatch: ['<rootDir>/tests/integration/real/**/*.test.ts'],
            preset: 'ts-jest',
            setupFilesAfterEnv: [
                '<rootDir>/node_modules/@org/test-infra/src/setup/jest.setup.real.ts',
            ],
            globalTeardown:
                '<rootDir>/node_modules/@org/test-infra/src/setup/global-teardown.ts',
            reporters,
        },
        {
            displayName: 'contract-consumer',
            testMatch: ['<rootDir>/tests/contract/consumer/**/*.test.ts'],
            preset: 'ts-jest',
            setupFilesAfterEnv: [
                '<rootDir>/node_modules/@org/test-infra/src/setup/jest.setup.mocks.ts',
            ],
            reporters,
        },
        {
            displayName: 'contract-provider',
            testMatch: ['<rootDir>/tests/contract/provider/**/*.test.ts'],
            preset: 'ts-jest',
            setupFilesAfterEnv: [
                '<rootDir>/node_modules/@org/test-infra/src/setup/jest.setup.mocks.ts',
            ],
            reporters,
        },
    ],
});
