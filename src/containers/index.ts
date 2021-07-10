import { container } from 'tsyringe';

import '../providers';

import ICustomersRepository from '../infra/typeorm/repositories/ICustomersRepository';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);