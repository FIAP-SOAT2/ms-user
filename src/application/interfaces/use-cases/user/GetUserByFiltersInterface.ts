import { UseCase } from '../UseCase';
import { UserNotFoundError } from '../../../errors/user/UserNotFoundError';
import { UserEntity } from '@domain/entities/User';

export interface GetUserByFiltersInterface extends UseCase<GetUserByFiltersInterface.Request, GetUserByFiltersInterface.Response> {
  execute(queryString: GetUserByFiltersInterface.Request): Promise<GetUserByFiltersInterface.Response>;
}

export namespace GetUserByFiltersInterface {
  export type Request = { email?: string; cpf?: string };
  export type Response = UserEntity | UserNotFoundError;
}
