import { UseCase } from '../UseCase';

export interface DeleteUserInterface extends UseCase<DeleteUserInterface.Request, DeleteUserInterface.Response> {
  execute(userId: DeleteUserInterface.Request): Promise<DeleteUserInterface.Response>;
}

export namespace DeleteUserInterface {
  export type Request = number;
  export type Response = void;
}
