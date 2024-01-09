import { IUserDomain } from '@domain/entities/User';

export interface UpdateUserRepository {
  updateUser(params: UpdateUserRepository.Request);
}

export namespace UpdateUserRepository {
  export type Request = {
    userId: number;
    userData: Partial<Omit<IUserDomain, 'id' | 'createdAt' | 'updatedAt'>>;
  };
}
