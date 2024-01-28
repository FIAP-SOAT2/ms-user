
import { UserRepository } from '../../infra/database/repositories/UserRepository';
import { prisma } from '../../infra/database/orm/prisma';
import { GetUserByFiltersRepository } from '../../application/interfaces/repositories/user/GetUserByFiltersRepository';
import { user, user2, userUpdate } from '../../tests/mock/user';
import { UpdateUserRepository } from '../../application/interfaces/repositories/user/UpdateUserRepository';
import { GetUserRepository } from '../../application/interfaces/repositories/user/GetUserRepository';

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => ({
        user: {
            create: jest.fn(),
            getUserById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            count: jest.fn()
        },
    })),
}));
describe('UserRepository', () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        test('should create a user successfully', async () => {
            const userData = user2;
            await userRepository.createUser(userData);
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: userData,
            });
        });
        test('should throw an error if user creation fails', async () => {
            const userData = user2;
            (prisma.user.create as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(userRepository.createUser(userData)).rejects.toThrow('Database error');
        });

    });

    describe('updateUser', () => {
        const params: UpdateUserRepository.Request = {
            userId: 1,
            userData: userUpdate
        };
        test('should update a user successfully', async () => {

            await userRepository.updateUser(params);
            expect(prisma.user.update).toHaveBeenCalledWith({
                where: {
                    id: Number(params.userId),
                },
                data: userUpdate,
            });
        });

        test('should throw an error if user update fails', async () => {
            (prisma.user.update as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(userRepository.updateUser(params)).rejects.toThrow('Database error');
        });
    });

    describe('getUserByFilters', () => {
        test('should get a user by filters successfully', async () => {
            const queryString: GetUserByFiltersRepository.Request = {
                email: 'test@gmail.com'
            }
            await userRepository.getUserByFilters(queryString);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: {
                    email: queryString.email || undefined,
                    cpf: queryString.cpf || undefined,
                },
            });
        });
    });

    describe('deleteUser', () => {
        test('should delete a user successfully', async () => {
            const userId = 1;
            await userRepository.deleteUser(userId);
            expect(prisma.user.delete).toHaveBeenCalledWith({
                where: {
                    id: userId,
                },
            });
        });
    });

    describe('getUserById', () => {
        test('should get a user by ID successfully', async () => {
            const userId = 1;
            await userRepository.getUserById(userId);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: {
                    id: +userId,
                },
            });
        });

        test('should throw an error if user retrieval by ID fails', async () => {
            const userId = 1;
            (prisma.user.findUnique as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(userRepository.getUserById(userId)).rejects.toThrow('Database error');
        });
    });

    describe('getUsers', () => {
        test('should get users successfully with pagination', async () => {
            const params: GetUserRepository.Request = {
                page: 1,
                paginationLimit: 10
            };
            (prisma.user.findMany as jest.Mock).mockResolvedValueOnce(user);
            (prisma.user.count as jest.Mock).mockResolvedValueOnce(1);

            const result = await userRepository.getUsers(params);
            expect(prisma.user.findMany).toHaveBeenCalledWith({
                orderBy: {
                    id: 'asc',
                },
            });
            expect(prisma.user.count).toHaveBeenCalled();
            expect(result).toEqual({
                data: user,
                page: params.page,
                total: 1,
                totalPages: 1
            });
        });
    });
});
