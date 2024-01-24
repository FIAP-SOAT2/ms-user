import { GetUserById } from '../../application/use-cases/user/GetUserById';
import { UserRepository } from '../../infra/database/repositories/UserRepository';
import request from 'supertest';
import { user, userCPFError, userEmailError } from '../mock/user';
import setupApp from '../../main/config/app';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    user: {
      create: jest.fn(),
      getUserById: jest.fn().mockResolvedValue(null),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      getUserByFilters: jest.fn(),
    },
  })),
}));
describe('healthcheckController', () => {
  let server;
  let app;
  const userId = 1;

  beforeEach(async function () {
    app = setupApp();
    server = app.listen(3000, () => {});
  });
  afterEach(async function () {
    jest.clearAllMocks();
    server.close();
  });

  describe('Create user', () => {
    beforeEach(async function () {
      jest.mock('@prisma/client', () => ({
        PrismaClient: jest.fn(() => ({
          user: {
            create: jest.fn(),
            getUserById: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        })),
      }));
    });
    test('should return 400 when creating user with error', async () => {
      const response = await request(server).post('/api/user');
      expect(response.status).toBe(400);
    });

    test('should return 201 when successfully creating user', async () => {
      const response = await request(server).post('/api/user').send(user);
      expect(response.status).toBe(201);
    });
    test('should return 400 when creating user with error in email', async () => {
      const response = await request(server).post('/api/user').send(userEmailError);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid param: email');
    });
    test('should return 400 when creating user with error in CPF', async () => {
      const response = await request(server).post('/api/user').send(userCPFError);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid param: cpf');
    });
  });
  describe('Update user', () => {
    test('should return 200 when user updated successfully', async () => {
      const message = 'User updated successfully';
      jest.spyOn(UserRepository.prototype, 'getUserById').mockResolvedValue(user);
      jest.spyOn(UserRepository.prototype, 'updateUser').mockResolvedValue(message);
      const response = await request(server).patch(`/api/user/${userId}`).send(user);
      expect(response.status).toBe(200);
      expect(response.body).toBe(message);
    });
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
  describe('Get user', () => {
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
});
