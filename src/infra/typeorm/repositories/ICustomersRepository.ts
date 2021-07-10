import IFindAllCustomerByCountryDTO from '../../../dtos/IFindAllCustomerByCountryDTO';
import IFindAllCustomerDTO from '../../../dtos/IFindAllCustomerDTO';
import Customer from '../entities/Customer';

export default interface ICustomersRepository {
  findAll(): Promise<Customer[]>;
  findAllByCountry(data: IFindAllCustomerByCountryDTO): Promise<Customer[]>;
}