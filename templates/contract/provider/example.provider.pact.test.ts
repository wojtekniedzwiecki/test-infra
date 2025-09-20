import { Verifier } from '@pact-foundation/pact';
import path from 'path';

describe('provider contract verification', () => {
  it('validates provider against consumer pact', async () => {
    const opts = {
      providerBaseUrl: process.env.PROVIDER_BASE_URL || 'http://localhost:8080',
      pactUrls: [path.resolve(process.cwd(), 'pacts', 'MyConsumer-MyProvider.json')],
    };
    await new Verifier(opts).verifyProvider();
  });
});