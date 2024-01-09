import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { GetUserByIdController } from '../../../../../infra/http/controllers/user/GetUserByIdController';
import { makeGetUserById } from './../../../../factories/use-cases/user/get-user-by-id-factory';

export const makeGetUserByIdController = (): BaseController => {
  const useCase = makeGetUserById();
  return new GetUserByIdController(useCase);
};
