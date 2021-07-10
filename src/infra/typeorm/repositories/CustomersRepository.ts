import { getRepository, Repository, Like } from 'typeorm';
import ICustomersRepository from './ICustomersRepository';
import IFindAllCustomerByCountryDTO from '../../../dtos/IFindAllCustomerByCountryDTO';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findAll(): Promise<Customer[]> {
    return await this.ormRepository.find({ cache: true });
  }

  public async findAllByCountry({
    country_code
  }: IFindAllCustomerByCountryDTO): Promise<Customer[]> {
    return await this.ormRepository.find({ phone: Like(`(${country_code})%`) });
  }
}

export default CustomersRepository;
