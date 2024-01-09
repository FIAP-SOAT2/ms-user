import { BaseController } from '../../../../infra/http/controllers/BaseController';
import { HttpRequest } from '../../../../infra/http/interfaces/HttpRequest';
import { HttpResponse } from '../../../../infra/http/interfaces/HttpResponse';
import { notFound, ok } from '../../../../infra/http/helpers/http';
import { UpdateUserInterface } from '@application/interfaces/use-cases/user/UpdateUserInterface';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/user/GetUserByIdInterface';
import { UserNotFoundError } from '../../../../application/errors/user/UserNotFoundError';
import { Validation } from '@infra/http/interfaces/Validation';

export class UpdateUserController extends BaseController {
  constructor(
    private readonly getUserUpdateValidation: Validation,
    private readonly getUserById: GetUserByIdInterface,
    private readonly updateUser: UpdateUserInterface,
  ) {
    super();
  }

  async execute(httpRequest: UpdateUserController.Request): Promise<UpdateUserController.Response> {
    const { id } = httpRequest.params!;
    const { name, email, phone, cpf, profile } = httpRequest.body;

    const userOrError = await this.getUserById.execute(+id);
    if (userOrError instanceof UserNotFoundError) {
      return notFound(userOrError);
    }

    const updatedUserOrError = await this.updateUser.execute({
      userId: id,
      userData: {
        name,
        email,
        phone,
        cpf,
        profile,
      },
    });
    if (updatedUserOrError instanceof UserNotFoundError) {
      return notFound(updatedUserOrError);
    }
    return ok(updatedUserOrError);
  }
}

export namespace UpdateUserController {
  export type Request = HttpRequest<UpdateUserInterface.UserDataType, { id: number }>;
  export type Response = HttpResponse<UpdateUserInterface.Response | UserNotFoundError>;
}
