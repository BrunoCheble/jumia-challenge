import ICustomersRepository from '../../infra/typeorm/repositories/ICustomersRepository';
import IFindAllCustomerByCountryDTO from '../../dtos/IFindAllCustomerByCountryDTO';
import Customer from '../../infra/typeorm/entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async findAll(): Promise<Customer[]> {
    return await this.customers;
  }

  public async findAllByCountry({
    country_code
  }: IFindAllCustomerByCountryDTO): Promise<Customer[]> {
    return await this.customers.filter(customer => customer.phone.indexOf(`(${country_code})`) == 0);
  }

  public async create(phone: string): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, { phone });

    this.customers.push(customer);

    return customer;
  }
}

export default CustomersRepository;
