import { Pact } from '@pact-foundation/pact';

describe('consumer contract', () => {
    it('publishes consumer pact', async () => {
        const provider = new Pact({
            consumer: 'MyConsumer',
            provider: 'MyProvider',
        });
        // define interactions here
    });
});
