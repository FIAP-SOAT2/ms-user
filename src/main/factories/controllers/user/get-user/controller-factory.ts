import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { GetUsersController } from '../../../../../infra/http/controllers/user/GetUsersController';
import { makeGetUsers } from '../../../use-cases/user/get-users-factory';

export const makeGetUsersController = (): BaseController => {
  const useCase = makeGetUsers();
  return new GetUsersController(useCase);
};
