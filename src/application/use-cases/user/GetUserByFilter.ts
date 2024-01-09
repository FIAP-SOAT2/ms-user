import { UserNotFoundError } from '../../errors/user/UserNotFoundError';
import { GetUserByFiltersRepository } from '../../interfaces/repositories/user/GetUserByFiltersRepository';
import { GetUserByFiltersInterface } from '@application/interfaces/use-cases/user/GetUserByFiltersInterface';

export class GetUserByFilters implements GetUserByFiltersInterface {
  constructor(private readonly getUserByFiltersRepository: GetUserByFiltersRepository) {}

  async execute(queryString: GetUserByFiltersInterface.Request): Promise<GetUserByFiltersInterface.Response> {
    const { email, cpf } = queryString;
    const user = await this.getUserByFiltersRepository.getUserByFilters({ email, cpf });

    if (!user) {
      return new UserNotFoundError();
    }

    return user;
  }
}
