import { EnumValidatorAdapter } from '../../infra/http/validators/EnumValidatorAdapter';

// Mock for the 'validator' library
jest.mock('validator', () => ({
  isAlpha: jest.fn(),
}));

describe('EnumValidatorAdapter', () => {
  const validator = require('validator');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return false for an invalid enum value (non-alphabetic)', () => {
    const enumValidatorAdapter = new EnumValidatorAdapter();
    const dataEnum = '123'; 
    const typeEnum = { VALUE1: 'value1', VALUE2: 'value2' };

    // Mocking isAlpha to return false
    (validator.isAlpha as jest.Mock).mockReturnValue(false);

    const result = enumValidatorAdapter.isValid(dataEnum, typeEnum);

    expect(result).toBe(false);
    expect(validator.isAlpha).toHaveBeenCalledWith(dataEnum);
  });

  test('should return false for an invalid enum value (not in typeEnum)', () => {
    const enumValidatorAdapter = new EnumValidatorAdapter();
    const dataEnum = 'invalidValue';
    const typeEnum = { VALUE1: 'value1', VALUE2: 'value2' };

    // Mocking isAlpha to return true
    (validator.isAlpha as jest.Mock).mockReturnValue(true);

    const result = enumValidatorAdapter.isValid(dataEnum, typeEnum);

    expect(result).toBe(false);
    expect(validator.isAlpha).toHaveBeenCalledWith(dataEnum);
  });
});
