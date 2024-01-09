import { ValidationComposite } from '../../../../../infra/http/validations/ValidationComposite';
import { EmailValidation } from '../../../../../infra/http/validations/EmailValidation';
import { CpfValidation } from '../../../../../infra/http/validations/CpfValidation';
import { EmailValidatorAdapter } from '../../../../../infra/http/validators/EmailValidatorAdapter';
import { CPfValidatorAdapter } from '../../../../../infra/http/validators/CpfValidatorAdapter';

export const makeGetUserByFiltersValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter();
  const cpfValidator = new CPfValidatorAdapter();

  return new ValidationComposite([new EmailValidation('email', emailValidator), new CpfValidation('cpf', cpfValidator)], 'query');
};
