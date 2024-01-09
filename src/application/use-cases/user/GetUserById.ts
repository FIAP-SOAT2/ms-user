import { UserNotFoundError } from '../../errors/user/UserNotFoundError';
import { GetUserByIdRepository } from '../../../application/interfaces/repositories/user/GetUserByIdRepository';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/user/GetUserByIdInterface';

export class GetUserById implements GetUserByIdInterface {
  constructor(private readonly getUserByIdRepository: GetUserByIdRepository) {}

  async execute(userId: GetUserByIdInterface.Request): Promise<GetUserByIdInterface.Response> {
    const user = await this.getUserByIdRepository.getUserById(userId);
    if (!user) {
      return new UserNotFoundError();
    }
    return user;
  }
}
