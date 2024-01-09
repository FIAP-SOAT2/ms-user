import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { makeGetUserById } from '../../../../../main/factories/use-cases/user/get-user-by-id-factory';
import { makeDeleteUser } from '../../../../../main/factories/use-cases/user/delete-user-factory';
import { DeleteUserController } from '../../../../../infra/http/controllers/user/DeleteUserController';

export const makeDeleteUserController = (): BaseController => {
  const getUserByIdUseCase = makeGetUserById();
  const deleteUserUseCase = makeDeleteUser();

  return new DeleteUserController(getUserByIdUseCase, deleteUserUseCase);
};
