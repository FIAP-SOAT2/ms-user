import { CreateUserInterface } from '@application/interfaces/use-cases/user/CreateUserInterface';
import { CreateUserRepository } from '@application/interfaces/repositories/user/CreateUserRepository';
import { GetUserByFiltersRepository } from '@application/interfaces/repositories/user/GetUserByFiltersRepository';
import { UserExistError } from '../../../application/errors/user/UserExistingError';

export class CreateUser implements CreateUserInterface {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByFilter: GetUserByFiltersRepository,
  ) {}

  async execute(userData: CreateUserInterface.Request): Promise<CreateUserInterface.Response> {
    // const existingUser = await this.findUserByFilter.getUserByFilters({ email: userData.email});
    // if (existingUser) {
    //     return new UserExistError();
    // }
    await this.createUserRepository.createUser({
      ...userData,
    });
  }
}
