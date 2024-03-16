import { ValidationComposite } from '../../../../../infra//http/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../../../../infra//http/validations/RequiredFieldValidation';
import { EmailValidation } from '../../../../../infra/http/validations/EmailValidation';
import { CpfValidation } from '../../../../../infra/http/validations/CpfValidation';
import { NumberValidatorAdapter } from '../../../../../infra/http/validators/NumberValidatorAdapter';
import { EnumValidatorAdapter } from '../../../../../infra/http/validators/EnumValidatorAdapter';
import { EnumFieldValidation } from '../../../../../infra/http/validations/EnumFieldValidation';
import { NumberFieldValidation } from '../../../../../infra/http/validations/NumberFieldValidation';
import { ProfileEnum } from '../../../../../domain/enum/UserEnum';
import { EmailValidatorAdapter } from '../../../../../infra/http/validators/EmailValidatorAdapter';
import { CPfValidatorAdapter } from '../../../../../infra/http/validators/CpfValidatorAdapter';

export const makeDeleteUserLGPDValidation = (): ValidationComposite => {
  const cpfValidator = new CPfValidatorAdapter();
  const numberValidator = new NumberValidatorAdapter();
  const enumValidator = new EnumValidatorAdapter();

  return new ValidationComposite(
    [
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('address'),
      new RequiredFieldValidation('cpf'),
      new CpfValidation('cpf', cpfValidator),
      new RequiredFieldValidation('phone'),
      new NumberFieldValidation('phone', numberValidator),
    ],
    'body',
  );
};
