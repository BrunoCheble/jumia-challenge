import IPhoneValidatorProvider from '../models/IPhoneValidatorProvider';
import IValidateDTO from '../dtos/IValidateDTO';

interface IRegExs {
  country_code: string;
  regex: RegExp
}

export default class PhoneValidatorProvider implements IPhoneValidatorProvider {

  private countriesRegex:IRegExs[] = [
    {country_code: '258', regex: /\(258\)\ ?[28]\d{7,8}$/},
    {country_code: '256', regex: /\(256\)\ ?\d{9}$/},
    {country_code: '237', regex: /\(237\)\ ?[2368]\d{7,8}$/},
    {country_code: '251', regex: /\(251\)\ ?[1-59]\d{8}$/},
    {country_code: '212', regex: /\(212\)\ ?[5-9]\d{8}$/},
  ];
  
  public validate({ country_code, phone }: IValidateDTO): boolean {

    const country = this.countriesRegex.find(country => country.country_code === country_code && country.regex.test(phone));
    return country !== undefined;
  }
}
 