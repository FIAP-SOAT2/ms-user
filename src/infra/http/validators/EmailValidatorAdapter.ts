import validator from 'validator';
import { EmailValidator } from '../validations/interfaces/EmailValidator';

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email) {
    return validator.isEmail(email);
  }
}
