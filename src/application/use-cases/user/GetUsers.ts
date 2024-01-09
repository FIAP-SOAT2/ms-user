import { GetUserRepository } from '../../interfaces/repositories/user/GetUserRepository';
import { GetUserInterface } from '@application/interfaces/use-cases/user/GetUsersInterface';
import { paginationConfig } from '../../config/pagination';

export class GetUsers implements GetUserInterface {
  constructor(private readonly getUsersRepository: GetUserRepository) {}

  async execute(params: GetUserInterface.Request): Promise<GetUserInterface.Response> {
    const { page = 1 } = params;
    const { paginationLimit } = paginationConfig;
    return this.getUsersRepository.getUsers({
      page,
      paginationLimit,
    });
  }
}
