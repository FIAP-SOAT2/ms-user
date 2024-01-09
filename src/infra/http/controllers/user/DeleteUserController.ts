import { BaseController } from '../../../../infra/http/controllers/BaseController';
import { HttpRequest } from '../../../../infra/http/interfaces/HttpRequest';
import { HttpResponse } from '../../../../infra/http/interfaces/HttpResponse';
import { noContent, notFound } from '../../../../infra/http/helpers/http';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/user/GetUserByIdInterface';
import { DeleteUserInterface } from '@application/interfaces/use-cases/user/DeleteUserInterface';
import { UserNotFoundError } from '../../../../application/errors/user/UserNotFoundError';

export class DeleteUserController extends BaseController {
  constructor(
    private readonly getUserById: GetUserByIdInterface,
    private readonly deleteUser: DeleteUserInterface,
  ) {
    super();
  }

  async execute(httpRequest: DeleteUserController.Request): Promise<DeleteUserController.Response> {
    const { id } = httpRequest.params!;
    const userOrError = await this.getUserById.execute(id);
    if (userOrError instanceof UserNotFoundError) {
      return notFound(userOrError);
    }
    await this.deleteUser.execute(id);
    return noContent();
  }
}

export namespace DeleteUserController {
  export type Request = HttpRequest<undefined, { id: number }>;
  export type Response = HttpResponse<undefined | UserNotFoundError>;
}
