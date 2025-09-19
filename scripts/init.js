#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');

async function main() {
    const cwd = process.cwd();
    const templatesDir = path.join(__dirname, '..', 'templates');
    const testsDir = path.join(cwd, 'tests');

    console.log('🔧 Initializing @org/test-infra templates...');
    await fs.copy(templatesDir, testsDir, {
        overwrite: false,
        errorOnExist: false,
    });
    console.log('✅ Templates copied to your repo.');
}

main().catch(err => {
    console.error('Error copying templates:', err);
    process.exit(1);
});
