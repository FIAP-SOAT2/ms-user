import { HttpRequest } from '../../../http/interfaces/HttpRequest';
import { HttpResponse } from '../../../http/interfaces/HttpResponse';
import { notFound, ok } from '../../../http/helpers/http';
import { BaseController } from '../../../http/controllers/BaseController';
import { UserNotFoundError } from '../../../../application/errors/user/UserNotFoundError';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/user/GetUserByIdInterface';

export class GetUserByIdController extends BaseController {
  constructor(private readonly getUserById: GetUserByIdInterface) {
    super();
  }

  async execute(httpRequest: GetUserByIdController.Request): Promise<GetUserByIdController.Response> {
    const { id } = httpRequest.params!;
    const userOrError = await this.getUserById.execute(id);

    if (userOrError instanceof UserNotFoundError) {
      return notFound(userOrError);
    }
    return ok(userOrError);
  }
}

export namespace GetUserByIdController {
  export type Request = HttpRequest<undefined, { id: number }>;
  export type Response = HttpResponse<GetUserByIdInterface.Response>;
}
