import { EnumFieldValidation } from '../../infra/http/validations/EnumFieldValidation';
import { InvalidParamError } from '../../infra/http/errors/InvalidParamError';

// Mock EnumValidator implementation for testing
class MockEnumValidator {
  isValid(value: any, enumType: any): boolean {
    // Implement your mock validation logic here
    return Object.values(enumType).includes(value);
  }
}

describe('EnumFieldValidation', () => {
  test('should not return an error for a valid enum value', () => {
    const fieldName = 'exampleField';
    const enumValidator = new MockEnumValidator();
    const typeEnum = { VALUE1: 'value1', VALUE2: 'value2' };
    const validation = new EnumFieldValidation(fieldName, enumValidator, typeEnum);

    const input = {
      [fieldName]: 'value1',
    };

    const result = validation.validate(input);

    expect(result).toBeNull();
  });

  test('should return InvalidParamError for an invalid enum value', () => {
    const fieldName = 'exampleField';
    const enumValidator = new MockEnumValidator();
    const typeEnum = { VALUE1: 'value1', VALUE2: 'value2' };
    const validation = new EnumFieldValidation(fieldName, enumValidator, typeEnum);

    const input = {
      [fieldName]: 'invalidValue',
    };

    const result = validation.validate(input);

    expect(result).toBeInstanceOf(InvalidParamError);
    expect(result!.message).toBe(`Invalid param: ${fieldName}`);
  });


});
