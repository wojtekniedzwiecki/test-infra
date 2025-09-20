import { Pact } from '@pact-foundation/pact';
import path from 'path';
import axios from 'axios';

describe('consumer contract', () => {
  const provider = new Pact({
    consumer: 'MyConsumer',
    provider: 'MyProvider',
    port: 1234,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
  });

  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  it('publishes consumer pact', async () => {
    await provider.addInteraction({
      state: 'provider has data',
      uponReceiving: 'a request for data',
      withRequest: {
        method: 'GET',
        path: '/data',
      },
      willRespondWith: {
        status: 200,
        body: { id: 1, name: 'example' },
      },
    });

    const response = await axios.get('http://localhost:1234/data');
    expect(response.data).toEqual({ id: 1, name: 'example' });

    await provider.verify();
  });
});