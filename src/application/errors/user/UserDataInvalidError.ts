export class UserDataInvalidError extends Error {
  constructor() {
    super('Invalid data');
    this.name = 'UserDataInvalid';
  }
}
