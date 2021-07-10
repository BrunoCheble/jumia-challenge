import { container } from 'tsyringe';

import IPhoneValidatorProvider from './PhoneValidator/models/IPhoneValidatorProvider';
import PhoneValidatorProvider from './PhoneValidator/implementations/PhoneValidatorProvider';

container.registerSingleton<IPhoneValidatorProvider>(
  'PhoneValidatorProvider',
  PhoneValidatorProvider,
);