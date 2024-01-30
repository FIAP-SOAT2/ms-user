import { UserRepository } from '../../infra/database/repositories/UserRepository';
import request from 'supertest';
import { user } from '../mock/user';
import setupApp from '../../main/config/app';
describe('Delete user', () => {
    let server;
    let app;
    const userId = 1;

    beforeEach(async function () {
        app = setupApp();
        server = app.listen(4001, () => { });
    });
    afterEach(async function () {
        jest.clearAllMocks();
        server.close();
    });

    describe('Delete user', () => {
      test('should return 201 when deleted user successfully', async () => {
        jest.spyOn(UserRepository.prototype, 'getUserById').mockResolvedValue(user);
        jest.spyOn(UserRepository.prototype, 'deleteUser').mockResolvedValue();
        const response = await request(server).delete(`/api/user/${userId}`).send(user);
        expect(response.status).toBe(204);
      });
      test('should return 400 when deleted user not found', async () => {
        jest.spyOn(UserRepository.prototype, 'getUserById').mockResolvedValue(null);
        const response = await request(server).delete(`/api/user/${userId}`).send(user);
        expect(response.status).toBe(404);
      });
    });
});