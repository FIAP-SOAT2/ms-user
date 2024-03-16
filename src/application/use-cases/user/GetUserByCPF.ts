import { UserNotFoundError } from '../../errors/user/UserNotFoundError';
import { GetUserByIdRepository } from '../../interfaces/repositories/user/GetUserByIdRepository';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/user/GetUserByIdInterface';
import { GetUserByCPFInterface } from '../../../application/interfaces/use-cases/user/GetUserByCPFInterface';
import { GetUserByCPFRepository } from '../../../application/interfaces/repositories/user/GetUserByCPFRepository';

export class GetUserByCPF implements GetUserByCPFInterface {
  constructor(private readonly getUserByCPFRepository: GetUserByCPFRepository) {}

  async execute(cpf: GetUserByCPFInterface.Request): Promise<GetUserByCPFInterface.Response> {
    const user = await this.getUserByCPFRepository.getUserByCPF(cpf);
    if (!user) {
      return new UserNotFoundError();
    }
    return user;
  }
}
