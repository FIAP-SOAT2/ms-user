import { UserRepository } from '../../infra/database/repositories/UserRepository';
import request from 'supertest';
import { user } from '../mock/user';
import setupApp from '../../main/config/app';
describe('Get user', () => {
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

    test('should return 200 on successfully getting the user', async () => {
        jest.spyOn(UserRepository.prototype, 'getUserById').mockResolvedValue(user);
        const response = await request(server).get(`/api/user/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(user);
      });
  
      test('should return 400 for users not found', async () => {
        jest.spyOn(UserRepository.prototype, 'getUserById').mockResolvedValue(null);
        const response = await request(server).get(`/api/user/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('The User was not found');
      });
  
      test('should return 200 on successfully getting the users by filters', async () => {
        jest.spyOn(UserRepository.prototype, 'getUserByFilters').mockResolvedValue(user);
        const response = await request(server).get(`/api/user/filters`);
        expect(response.status).toBe(200);
      });
      test('should return 404 for users not found by filters', async () => {
        jest.spyOn(UserRepository.prototype, 'getUserByFilters').mockResolvedValue(null);
        const response = await request(server).get(`/api/user/filters`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('The User was not found');
      });
  
      test('should return 200 on successfully getting users', async () => {
        jest.spyOn(UserRepository.prototype, 'getUsers').mockResolvedValue({
          data: user,
          page: 1,
          total: 1,
          totalPages: 1,
        });
        const response = await request(server).get(`/api/user`);
        expect(response.status).toBe(200);
      });
});