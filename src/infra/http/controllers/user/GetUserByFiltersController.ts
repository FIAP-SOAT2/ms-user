import { BaseController } from '../BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { notFound, ok } from '../../helpers/http';
import { UserNotFoundError } from '../../../../application/errors/user/UserNotFoundError';
import { GetUserByFiltersInterface } from '../../../../application/interfaces/use-cases/user/GetUserByFiltersInterface';
import { Validation } from '../../../../infra/http/interfaces/Validation';

export class GetUserByFiltersController extends BaseController {
  constructor(
    private readonly getUserByFiltersValidation: Validation,
    private readonly getUserByFilters: GetUserByFiltersInterface,
  ) {
    super(getUserByFiltersValidation);
  }

  async execute(httpRequest: GetUserByFiltersController.Request): Promise<GetUserByFiltersController.Response> {
    const { email, cpf } = httpRequest.query!;
    const userOrError = await this.getUserByFilters.execute({ email, cpf });
    if (userOrError instanceof UserNotFoundError) {
      return notFound(userOrError);
    }
    return ok(userOrError);
  }
}

export namespace GetUserByFiltersController {
  export type Request = HttpRequest<undefined, { email: string }>;
  export type Response = HttpResponse<GetUserByFiltersInterface.Response>;
}
