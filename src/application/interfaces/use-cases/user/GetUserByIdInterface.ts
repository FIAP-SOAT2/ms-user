import { UserNotFoundError } from '../../../errors/user/UserNotFoundError';
import { UseCase } from '../UseCase';
import { UserEntity } from '@domain/entities/User';

export interface GetUserByIdInterface extends UseCase<GetUserByIdInterface.Request, GetUserByIdInterface.Response> {
  execute(userId: GetUserByIdInterface.Request): Promise<GetUserByIdInterface.Response>;
}

export namespace GetUserByIdInterface {
  export type Request = number;
  export type Response = UserEntity | UserNotFoundError;
}
