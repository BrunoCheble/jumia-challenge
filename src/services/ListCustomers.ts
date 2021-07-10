import { injectable, inject } from 'tsyringe';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../infra/typeorm/repositories/ICustomersRepository';
import IPhoneValidatorProvider from '../providers/PhoneValidator/models/IPhoneValidatorProvider';

interface IRequestDTO {
  country_code: string;
  valid_phone: string;
  paginate_number: number;
}

interface IResponseDTO {
  country_code: string;
  phone: string;
  valid: boolean;
}

@injectable()
class ListCustomersService {
  private customers: Customer[];

  private all_countries = '0';
  private all_phones_status = '2';
  private valid_phone = '1';
  
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('PhoneValidatorProvider')
    private phoneValidatorProvider: IPhoneValidatorProvider
  ) {}

  public async execute({
    country_code,
    valid_phone,
    paginate_number
  }: IRequestDTO): Promise<IResponseDTO[]> {

    const page_limit = 5;
    const formatted_customers_limit = paginate_number*page_limit;
    const formatted_customers: IResponseDTO[] = [];

    if(country_code === this.all_countries) {
      this.customers = await this.customersRepository.findAll();
    }
    else {
      this.customers = await this.customersRepository.findAllByCountry({ country_code });
    }

    this.customers.some(customer => {
      
      if(formatted_customers.length === formatted_customers_limit) {
        return;
      }

      const country_code = customer.phone.substring(1, customer.phone.indexOf(')'));
      const valid = this.phoneValidatorProvider.validate({ country_code, phone: customer.phone });

      const is_all = valid_phone === this.all_phones_status;
      const just_valid = valid_phone === this.valid_phone && valid;
      const just_invalid = valid_phone !== this.valid_phone && !valid;

      if(is_all || just_valid || just_invalid) {
        formatted_customers.push({ country_code, phone: customer.phone, valid });
      }
    });
    
    const skip = (paginate_number-1)*page_limit;
    return formatted_customers.slice(skip);
  }
}

export default ListCustomersService;