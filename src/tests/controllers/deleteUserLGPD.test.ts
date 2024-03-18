import { UserRepository } from '../../infra/database/repositories/UserRepository';
import request from 'supertest';
import { user, userResquest, userResquestInvalid } from '../mock/user';
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
      test('should return 404 when user not found', async () => {
        jest.spyOn(UserRepository.prototype, 'getUserByCPF').mockResolvedValue(null);
        jest.spyOn(UserRepository.prototype, 'deleteUser').mockResolvedValue();
        const response = await request(server).delete(`/api/user`).send(userResquest);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('The User was not found');
      });
      test('should return 204 when user deleted', async () => {
        jest.spyOn(UserRepository.prototype, 'getUserByCPF').mockResolvedValue(user);
        jest.spyOn(UserRepository.prototype, 'deleteUser').mockResolvedValue();
        const response = await request(server).delete(`/api/user`).send(userResquest);
        expect(response.status).toBe(204);
      });

      test('should return 400 when user data invalid', async () => {
        jest.spyOn(UserRepository.prototype, 'getUserByCPF').mockResolvedValue(user);
        jest.spyOn(UserRepository.prototype, 'deleteUser').mockResolvedValue();
        const response = await request(server).delete(`/api/user`).send(userResquestInvalid);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid data');
      });
    });
});