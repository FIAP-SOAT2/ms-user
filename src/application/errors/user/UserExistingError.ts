export class UserExistError extends Error {
  constructor() {
    super('The User already exists');
    this.name = 'UserExistError';
  }
}
