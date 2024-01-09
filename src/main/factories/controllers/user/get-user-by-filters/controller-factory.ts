import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { GetUserByFiltersController } from '../../../../../infra/http/controllers/user/GetUserByFiltersController';
import { makeGetUserByFilters } from '../../../use-cases/user/get-user-by-filters-factory';
import { makeGetUserByFiltersValidation } from '../../../../../main/factories/controllers/user/get-user-by-filters/validation-factory';

export const makeGetUserByFiltersController = (): BaseController => {
  const validation = makeGetUserByFiltersValidation();
  const useCase = makeGetUserByFilters();
  return new GetUserByFiltersController(validation, useCase);
};
