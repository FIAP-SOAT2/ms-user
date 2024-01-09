import { CpfValidator } from '../validations/interfaces/CpfValidator';

export class CPfValidatorAdapter implements CpfValidator {
  isValid(cpf) {
    return cpf.match(/^[0-9]{11}$/);
  }
}
