import { BaseController } from '../BaseController';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { badRequest, noContent, notFound } from '../../helpers/http';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/user/GetUserByIdInterface';
import { DeleteUserInterface } from '@application/interfaces/use-cases/user/DeleteUserInterface';
import { UserNotFoundError } from '../../../../application/errors/user/UserNotFoundError';
import { GetUserByCPFInterface } from '../../../../application/interfaces/use-cases/user/GetUserByCPFInterface';
import { Validation } from '@infra/http/interfaces/Validation';
import { UserDataInvalidError } from '../../../../application/errors/user/UserDataInvalidError';

export class DeleteUserLGPDController extends BaseController {
  constructor(
    private readonly userValidation: Validation,
    private readonly getUserByCPF: GetUserByCPFInterface,
    private readonly deleteUser: DeleteUserInterface,
  ) {
    super(userValidation);
  }

  async execute(httpRequest: DeleteUserLGPDController.Request): Promise<DeleteUserLGPDController.Response> {
    
    const { cpf, phone, name, email } = httpRequest.body!;

    const user = await this.getUserByCPF.execute(cpf);
    if (user instanceof UserNotFoundError) {
      return notFound(user);
    }
    if(email === user.email && phone === user.phone && name === user.name){
      await this.deleteUser.execute(Number(user.id));
      return noContent();
    }
    return badRequest(new UserDataInvalidError); 
  }
}

export namespace DeleteUserLGPDController {
  export type Request = HttpRequest<{ cpf: string, phone: string, email: string, name: string }>;  ;
  export type Response = HttpResponse<undefined | UserNotFoundError | UserDataInvalidError>;
}
