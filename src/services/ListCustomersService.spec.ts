import 'reflect-metadata';
import ListCustomersService from './ListCustomers';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
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

  it('should be able to list all phones', async () => {
    
    customersRepository.create('(212) 698054317');
    customersRepository.create('(258) 84330678235');
    
    const phone1 = {
      country_code: '212',
      phone: '(212) 698054317',
      valid: true
    };

    const phone2 = {
      country_code: '258',
      phone: '(258) 84330678235',
      valid: false
    };

    const phones = await listCustomers.execute({
      country_code: '0',
      valid_phone: '2',
      paginate_number: 1
    });

    expect(phones).toEqual([phone1, phone2]);
  });
});
