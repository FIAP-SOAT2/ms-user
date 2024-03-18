import { Router } from 'express';
import { expressRouteAdapter } from '../../main/adapters/express-route-adapter';
import { makeCreateUserController } from '../factories/controllers/user/create-user/controller-factory';
import { makeGetUsersController } from '../factories/controllers/user/get-user/controller-factory';
import { makeGetUserByIdController } from '../factories/controllers/user/get-user-by-id/controller-factory';
import { makeGetUserByFiltersController } from '../factories/controllers/user/get-user-by-filters/controller-factory';
import { makeUpdateUserController } from '../factories/controllers/user/update-user/controller-factory';
import { makeDeleteUserController } from '../factories/controllers/user/delete-user/controller-factory';
import { makeDeleteUserLGPDController } from '../factories/controllers/user/delete-user-lgpd/controller-factory';

export default (router: Router): void => {
  router.post('/user/', expressRouteAdapter(makeCreateUserController()));
  router.get('/users/', expressRouteAdapter(makeGetUsersController()));
  router.get('/user/filters', expressRouteAdapter(makeGetUserByFiltersController()));
  router.get('/user/:id', expressRouteAdapter(makeGetUserByIdController()));
  router.patch('/user/:id', expressRouteAdapter(makeUpdateUserController()));
  router.delete('/user/:id', expressRouteAdapter(makeDeleteUserController()));
  router.delete('/user/', expressRouteAdapter(makeDeleteUserLGPDController()));
};
