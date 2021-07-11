import IFindAllCustomerByCountryDTO from '../../../dtos/IFindAllCustomerByCountryDTO';
import Customer from '../entities/Customer';

export default interface ICustomersRepository {
  findAll(): Promise<Customer[]>;
  findAllByCountry(data: IFindAllCustomerByCountryDTO): Promise<Customer[]>;
}