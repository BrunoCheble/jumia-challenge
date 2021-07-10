import IValidateDTO from '../dtos/IValidateDTO';

export default interface IPhoneValidatorProvider {
  validate(data: IValidateDTO): boolean;
}