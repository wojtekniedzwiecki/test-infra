import { Publisher } from '@pact-foundation/pact';
import path from 'path';

const publisher = new Publisher({
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: process.env.PACT_BROKER_URL || 'http://localhost:9292',
  consumerVersion: process.env.PACT_CONSUMER_VERSION || process.env.npm_package_version || '1.0.0',
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
});

publisher.publishPacts()
    .then(() => {
        console.log('Pacts published successfully');
    })
    .catch((err) => {
        console.error('Failed to publish pacts:', err);
    });