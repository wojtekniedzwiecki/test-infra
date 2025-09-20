const path = require('path');
const fs = require('fs-extra');

async function main() {
    const cwd = process.cwd();
    const templatesDir = path.join(__dirname, '..', 'templates');
    const testsDir = path.join(cwd, 'tests');
    const packageJsonPath = path.join(cwd, 'package.json');
    const ciWorkflowSrc = path.join(__dirname, '..', 'templates', '.github', 'workflows', 'ci.yml');
    const ciWorkflowDest = path.join(cwd, '.github', 'workflows', 'ci.yml');

    console.log('🔧 Initializing @org/test-infra templates...');
    await fs.copy(templatesDir, testsDir, {
        overwrite: false,
        errorOnExist: false,
    });
    console.log('✅ Templates copied to your repo.');

    // Add test scripts to package.json
    if (await fs.pathExists(packageJsonPath)) {
        const pkg = await fs.readJson(packageJsonPath);
        pkg.scripts = pkg.scripts || {};
        const testScripts = {
            "test:unit": "jest --config src/jest.config.ts --selectProjects unit",
            "test:integration:mocked": "jest --config src/jest.config.ts --selectProjects integration-mocked",
            "test:integration:real": "jest --config src/jest.config.ts --selectProjects integration-real",
            "test:contract:consumer": "jest --config src/jest.config.ts --selectProjects contract-consumer",
            "contract:publish": "echo 'Please configure: pact-broker publish ./pacts --consumer-app-version=\"$(npx absolute-version)\" --auto-detect-version-properties --broker-base-url=${PACT_BROKER_URL}'",
            "test:contract:provider": "jest --config src/jest.config.ts --selectProjects contract-provider",
            "test:e2e": "playwright test"
        };
        let updated = false;
        for (const [key, value] of Object.entries(testScripts)) {
            if (!pkg.scripts[key]) {
                pkg.scripts[key] = value;
                updated = true;
            }
        }
        if (updated) {
            await fs.writeJson(packageJsonPath, pkg, { spaces: 2 });
            console.log('✅ Test scripts added to package.json.');
        } else {
            console.log('ℹ️ Test scripts already exist in package.json.');
        }
    } else {
        console.warn('⚠️ package.json not found. Skipping script injection.');
    }

    // Add CI workflow if it doesn't exist
    if (await fs.pathExists(ciWorkflowSrc)) {
        await fs.ensureDir(path.dirname(ciWorkflowDest));
        await fs.copy(ciWorkflowSrc, ciWorkflowDest, {
            overwrite: false,
            errorOnExist: false,
        });
        console.log('✅ CI workflow copied to your repo.');
    } else {
        console.warn('⚠️ CI workflow template not found. Skipping.');
    }

}

main().catch(err => {
    console.error('Error initializing test infra:', err);
    process.exit(1);
});
