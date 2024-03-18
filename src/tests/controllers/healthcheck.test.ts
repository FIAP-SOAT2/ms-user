import request from 'supertest';
import setupApp from '../../main/config/app';

jest.mock('@prisma/client');
describe('healthcheckController', () => {
  let server;
  let app;

  beforeEach(async function () {
    app = setupApp();
    server = app.listen(4001, () => {});
  });
  afterEach(async function () {
    jest.clearAllMocks();
    server.close();
  });

  test('should return 200', async () => {
    const response = await request(server).get('/api/ms-user/health-check');
    expect(response.status).toBe(200);
  });
});
