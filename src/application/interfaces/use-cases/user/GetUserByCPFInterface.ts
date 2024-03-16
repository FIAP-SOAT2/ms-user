import { UserNotFoundError } from '../../../errors/user/UserNotFoundError';
import { UseCase } from '../UseCase';
import { UserEntity } from '@domain/entities/User';

export interface GetUserByCPFInterface extends UseCase<GetUserByCPFInterface.Request, GetUserByCPFInterface.Response> {
  execute(cpf: GetUserByCPFInterface.Request): Promise<GetUserByCPFInterface.Response>;
}

export namespace GetUserByCPFInterface {
  export type Request = string;
  export type Response = UserEntity | UserNotFoundError;
}
