import { UserExistError } from '@application/errors/user/UserExistingError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { UserEntity } from '@domain/entities/User';

export interface CreateUserInterface extends UseCase<CreateUserInterface.Request, CreateUserInterface.Response> {
  execute(UserData: CreateUserInterface.Request): Promise<CreateUserInterface.Response>;
}

export namespace CreateUserInterface {
  export type Request = Omit<UserEntity, 'id' | 'created_at' | 'updated_at'>;
  export type Response = void | UserExistError;
}
