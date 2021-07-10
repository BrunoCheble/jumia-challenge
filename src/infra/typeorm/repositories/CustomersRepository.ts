import { getRepository, Repository, Raw } from 'typeorm';
import ICustomersRepository from './ICustomersRepository';
import IFindAllCustomerByCountryDTO from '../../../dtos/IFindAllCustomerByCountryDTO';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findAll(): Promise<Customer[]> {
    
    const findCustomers = await this.ormRepository.find();
    return findCustomers;
  }

  public async findAllByCountry({
    country_code
  }: IFindAllCustomerByCountryDTO): Promise<Customer[]> {
    
    const findCustomers = await this.ormRepository.find({
      where: `phone like '(${country_code})%'`
    });
    
    return findCustomers;
  }
}

export default CustomersRepository;
