import 'reflect-metadata';
import ListCustomersService from './ListCustomers';
import FakeCustomersRepository from '../repositories/fake/FakeCustomersRepository';
import PhoneValidatorProvider from '../providers/PhoneValidator/implementations/PhoneValidatorProvider';

let phoneValidatorProvider: PhoneValidatorProvider;
let listCustomers: ListCustomersService;
let customersRepository: FakeCustomersRepository;

describe('ListCustomersService', () => {
  beforeEach(() => {
    phoneValidatorProvider = new PhoneValidatorProvider();
    customersRepository = new FakeCustomersRepository();
    listCustomers = new ListCustomersService(
      customersRepository,
      phoneValidatorProvider
    );
  });

  it('should be able to list valid phones', async () => {
    
    customersRepository.create('(212) 698054317');
    customersRepository.create('(212) 84330678235');
    
    const phone1 = {
      country_code: '212',
      phone: '(212) 698054317',
      valid: true
    };

    const phones = await listCustomers.execute({
      country_code: '212',
      valid_phone: '1',
      paginate_number: 1
    });

    expect(phones).toEqual([phone1]);
  });

  it('should be able to list invalid phones', async () => {
    
    customersRepository.create('(258) 84330678235');
    customersRepository.create('(212) 698054317');
    
    const phone1 = {
      country_code: '258',
      phone: '(258) 84330678235',
      valid: false
    };

    const phones = await listCustomers.execute({
      country_code: '258',
      valid_phone: '0',
      paginate_number: 1
    });

    expect(phones).toEqual([phone1]);
  });

  it('should be able to list all phones on 2th page', async () => {
    
    customersRepository.create('(212) 698054311');
    customersRepository.create('(212) 698054311');
    customersRepository.create('(212) 698054313');
    customersRepository.create('(212) 698054314');
    customersRepository.create('(212) 698054314');
    
    customersRepository.create('(212) 698054315');
    customersRepository.create('(212) 698054316');
    customersRepository.create('(212) 698054317');
    customersRepository.create('(212) 698054318');
    customersRepository.create('(245) 12345');
    
    customersRepository.create('(212) 698054317');
    customersRepository.create('(258) 84330678235');
    
    const phone1 = {
      country_code: '212',
      phone: '(212) 698054315',
      valid: true
    };

    const phone2 = {
      country_code: '212',
      phone: '(212) 698054316',
      valid: true
    };

    const phone3 = {
      country_code: '212',
      phone: '(212) 698054317',
      valid: true
    };

    const phone4 = {
      country_code: '212',
      phone: '(212) 698054318',
      valid: true
    };

    const phone5 = {
      country_code: '245',
      phone: '(245) 12345',
      valid: false
    };

    const phones = await listCustomers.execute({
      country_code: '0',
      valid_phone: '2',
      paginate_number: 2
    });

    expect(phones).toEqual([phone1, phone2, phone3, phone4, phone5]);
  });

  it('should be able to list empty', async () => {
    
    const phones = await listCustomers.execute({
      country_code: '123',
      valid_phone: '2',
      paginate_number: 1
    });

    expect(phones).toEqual([]);
  });
});
