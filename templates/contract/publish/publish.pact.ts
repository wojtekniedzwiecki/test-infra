// publishPacts.ts
import path from 'path';
import pact from '@pact-foundation/pact-node';

async function publishPacts() {
    const opts = {
        pactFilesOrDirs: [path.resolve(__dirname, '../pacts')],
        pactBroker: 'https://your-pact-broker-url',
        consumerVersion: process.env.GIT_COMMIT || '1.0.0',
        tags: ['dev'],
    };

    try {
        await pact.publishPacts(opts);
        console.log('Pacts successfully published');
    } catch (err) {
        console.error('Pact publish failed: ', err);
        process.exit(1);
    }
}

publishPacts();
