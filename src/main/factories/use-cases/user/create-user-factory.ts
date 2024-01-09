import { CreateUserInterface } from '@application/interfaces/use-cases/user/CreateUserInterface';
import { CreateUser } from '../../../../application/use-cases/user/CreateUser';
import { UserRepository } from '../../../../infra/database/repositories/UserRepository';

export const makeCreateUser = (): CreateUserInterface => {
  const userRepository = new UserRepository();
  return new CreateUser(userRepository, userRepository);
};
