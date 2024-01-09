import { GetUserByIdInterface } from '@application/interfaces/use-cases/user/GetUserByIdInterface';
import { GetUserById } from '../../../../application/use-cases/user/GetUserById';
import { UserRepository } from '../../../../infra/database/repositories/UserRepository';

export const makeGetUserById = (): GetUserByIdInterface => {
  const userRepository = new UserRepository();
  return new GetUserById(userRepository);
};
