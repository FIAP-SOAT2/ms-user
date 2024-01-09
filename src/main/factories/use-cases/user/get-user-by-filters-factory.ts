import { UserRepository } from '../../../../infra/database/repositories/UserRepository';
import { GetUserByFiltersInterface } from '@application/interfaces/use-cases/user/GetUserByFiltersInterface';
import { GetUserByFilters } from '../../../../application/use-cases/user/GetUserByFilter';

export const makeGetUserByFilters = (): GetUserByFiltersInterface => {
  const userRepository = new UserRepository();
  return new GetUserByFilters(userRepository);
};
