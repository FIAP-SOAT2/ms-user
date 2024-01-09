import { GetUserByIdRepository } from '../../../application/interfaces/repositories/user/GetUserByIdRepository';
import { UpdateUserRepository } from '../../interfaces/repositories/user/UpdateUserRepository';
import { UserNotFoundError } from '../../../application/errors/user/UserNotFoundError';
import { UpdateUserInterface } from '@application/interfaces/use-cases/user/UpdateUserInterface';

export class UpdateUser implements UpdateUserInterface {
  constructor(
    private readonly getUserByIdRepository: GetUserByIdRepository,
    private readonly updateUserRepository: UpdateUserRepository,
  ) {}

  async execute(params: UpdateUserInterface.Request): Promise<UpdateUserInterface.Response> {
    const { userId, userData } = params;
    const user = await this.getUserByIdRepository.getUserById(userId);
    if (!user) {
      return new UserNotFoundError();
    }

    return this.updateUserRepository.updateUser({ userId, userData });
  }
}
