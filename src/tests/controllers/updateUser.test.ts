import { UserRepository } from '../../infra/database/repositories/UserRepository';
import request from 'supertest';
import { user, userCPFError, userEmailError } from '../mock/user';
import setupApp from '../../main/config/app';
describe('Update user', () => {
    let server;
    let app;
    const userId = 1;

    beforeEach(async function () {
        app = setupApp();
        server = app.listen(3000, () => { });
    });
    afterEach(async function () {
        jest.clearAllMocks();
        server.close();
    });

    describe('Delete user', () => {
      test('should return 200 when user updated successfully', async () => {
        const message = 'User updated successfully';
        jest.spyOn(UserRepository.prototype, 'getUserById').mockResolvedValue(user);
        jest.spyOn(UserRepository.prototype, 'updateUser').mockResolvedValue(message);
        const response = await request(server).patch(`/api/user/${userId}`).send(user);
        expect(response.status).toBe(200);
        expect(response.body).toBe(message);
      });
    });
});