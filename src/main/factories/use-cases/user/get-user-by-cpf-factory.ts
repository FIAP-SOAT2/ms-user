import { GetUserByCPF } from '../../../../application/use-cases/user/GetUserByCPF';
import { GetUserByCPFInterface } from '../../../../application/interfaces/use-cases/user/GetUserByCPFInterface';
import { GetUserById } from '../../../../application/use-cases/user/GetUserById';
import { UserRepository } from '../../../../infra/database/repositories/UserRepository';

export const makeGetUserByCPF = (): GetUserByCPFInterface => {
  const userRepository = new UserRepository();
  return new GetUserByCPF(userRepository);
};
