import { UserEntity } from '@domain/entities/User';

export interface GetUserByCPFRepository {
  getUserByCPF(cpf: GetUserByCPFRepository.Request): Promise<GetUserByCPFRepository.Response>;
}

export namespace GetUserByCPFRepository {
  export type Request = string;
  export type Response = UserEntity | null;
}
