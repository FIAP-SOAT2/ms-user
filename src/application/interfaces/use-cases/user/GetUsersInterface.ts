import { UserEntity } from '@domain/entities/User';
import { UseCase } from '../UseCase';

export interface GetUserInterface extends UseCase<GetUserInterface.Request, GetUserInterface.Response> {
  execute(params: GetUserInterface.Request): Promise<GetUserInterface.Response>;
}

export namespace GetUserInterface {
  export type Request = { page?: number };
  export type Response = { data: UserEntity[]; page: number; total: number; totalPages: number };
}
