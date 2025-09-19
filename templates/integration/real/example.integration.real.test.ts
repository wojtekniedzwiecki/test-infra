import request from 'supertest';
import app from '../../../src/app';

describe('consumer integration', () => {
    it('returns consumer response', async () => {
        const res = await request(app).get('/ping');
        expect(res.status).toBe(200);
    });
});
