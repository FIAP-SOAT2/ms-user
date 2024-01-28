import { PermissionError } from '../../infra/http/errors/PermissionError';

describe('PermissionError', () => {
  test('should create an instance of PermissionError with the correct message and name', () => {
    const error = new PermissionError();

    expect(error).toBeInstanceOf(PermissionError);
    expect(error.message).toBe('Permission denied');
    expect(error.name).toBe('PermissionError');
  });
});
