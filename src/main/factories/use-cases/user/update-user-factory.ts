import { UserRepository } from '../../../../infra/database/repositories/UserRepository';
import { UpdateUserInterface } from '@application/interfaces/use-cases/user/UpdateUserInterface';
import { UpdateUser } from '../../../../application/use-cases/user/UpdateUser';

export const makeUpdateUser = (): UpdateUserInterface => {
  const userRepository = new UserRepository();
  return new UpdateUser(userRepository, userRepository);
};
