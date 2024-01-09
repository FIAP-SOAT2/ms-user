import { UserEntity } from '@domain/entities/User';

export interface GetUserByIdRepository {
  getUserById(UserId: GetUserByIdRepository.Request): Promise<GetUserByIdRepository.Response>;
}

export namespace GetUserByIdRepository {
  export type Request = number;
  export type Response = UserEntity | null;
}
