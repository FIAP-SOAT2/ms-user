import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { makeGetUserById } from '../../../use-cases/user/get-user-by-id-factory';
import { makeUpdateUser } from '../../../use-cases/user/update-user-factory';
import { UpdateUserController } from '../../../../../infra/http/controllers/user/UpdateUserController';
import { makeUpdateUserValidation } from '../../../../../main/factories/controllers/user/update-user/validation-factory';

export const makeUpdateUserController = (): BaseController => {
  const validation = makeUpdateUserValidation();
  const getUserByIdUseCase = makeGetUserById();
  const updateUserUseCase = makeUpdateUser();
  return new UpdateUserController(validation, getUserByIdUseCase, updateUserUseCase);
};
