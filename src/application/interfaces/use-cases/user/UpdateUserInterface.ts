import { UseCase } from '../UseCase';
import { UserNotFoundError } from '../../../errors/user/UserNotFoundError';
import { IUserDomain } from '../../../../domain/entities/User';

export interface UpdateUserInterface extends UseCase<UpdateUserInterface.Request, UpdateUserInterface.Response> {
  execute(params: UpdateUserInterface.Request): Promise<UpdateUserInterface.Response>;
}

export namespace UpdateUserInterface {
  export type UserIdType = number;
  export type UserDataType = Partial<Omit<IUserDomain, 'id' | 'createdAt' | 'updatedAt'>>;
  export type Request = { userId: UserIdType; userData: UserDataType };
  export type Response = string | UserNotFoundError;
}
