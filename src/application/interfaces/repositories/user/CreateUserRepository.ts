import { UserEntity } from '../../../../domain/entities/User';

export interface CreateUserRepository {
  createUser(userData: any): Promise<void>;
}

export namespace CreateUserRepository {
  export type Request = Omit<UserEntity, 'id' | 'created_at' | 'updated_at'>;
}
