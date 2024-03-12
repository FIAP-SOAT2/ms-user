import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { CreateUserController } from '../../../../../infra/http/controllers/user/CreateUserController';
import { makeCreateUser } from '../../../use-cases/user/create-user-factory';
import { makeCreateUserValidation } from './validation-factory';

export const makeCreateUserController = (): BaseController => {
  console.log('Creating a user! - controller')
  const validation = makeCreateUserValidation();
  const useCase = makeCreateUser();
  const data = new CreateUserController(validation, useCase);
  return data;
};
