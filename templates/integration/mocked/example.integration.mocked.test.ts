import request from 'supertest';
import app from '../../../src/app';
import externalService from '../../../src/services/externalService';

jest.mock('../../../src/services/externalService');

describe('consumer integration (mocked)', () => {
    beforeAll(() => {
        (externalService.getData as jest.Mock).mockResolvedValue({ status: 'ok' });
    });

    it('returns mocked consumer response', async () => {
        const res = await request(app).get('/ping');
        expect(res.status).toBe(200);
        // Optionally check mocked data usage
        expect(externalService.getData).toHaveBeenCalled();
    });
});
