import { DeleteUserRepository } from '@application/interfaces/repositories/user/DeleteUserRepository';
import { DeleteUserInterface } from '@application/interfaces/use-cases/user/DeleteUserInterface';

export class DeleteUser implements DeleteUserInterface {
  constructor(private readonly deleteUserRepository: DeleteUserRepository) {}

  async execute(userId: DeleteUserInterface.Request): Promise<DeleteUserInterface.Response> {
    await this.deleteUserRepository.deleteUser(userId);
  }
}
