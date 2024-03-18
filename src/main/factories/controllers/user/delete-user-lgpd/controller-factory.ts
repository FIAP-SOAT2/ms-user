import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { makeGetUserById } from '../../../../../main/factories/use-cases/user/get-user-by-id-factory';
import { makeDeleteUser } from '../../../../../main/factories/use-cases/user/delete-user-factory';
import { DeleteUserLGPDController } from '../../../../../infra/http/controllers/user/DeleteUserLgpdController';
import { makeGetUserByCPF } from '../../../../../main/factories/use-cases/user/get-user-by-cpf-factory';
import { makeDeleteUserLGPDValidation } from './validation-factory';

export const makeDeleteUserLGPDController = (): BaseController => {
  const validation = makeDeleteUserLGPDValidation();
  const getUserByCPFUseCase = makeGetUserByCPF();
  const deleteUserUseCase = makeDeleteUser();

  return new DeleteUserLGPDController(validation,getUserByCPFUseCase, deleteUserUseCase);
};
