import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { BaseController } from '../BaseController';
import { GetUserInterface } from '@application/interfaces/use-cases/user/GetUsersInterface';
import { ok } from '../../../http/helpers/http';

export class GetUsersController extends BaseController {
  constructor(private readonly getUsers: GetUserInterface) {
    super();
  }

  async execute(httpRequest: GetUsersController.Request): Promise<GetUsersController.Response> {
    const { page } = httpRequest.params!;
    const response = await this.getUsers.execute({ page });
    return ok(response);
  }
}

export namespace GetUsersController {
  export type Request = HttpRequest<undefined, { page?: number }>;
  export type Response = HttpResponse<GetUserInterface.Response>;
}
