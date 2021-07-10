import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListCustomers from '../../../services/ListCustomers';

export default class CustomersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { country_code, valid_phone, page } = request.params;
    
    const listCustomerService = container.resolve(ListCustomers);

    const customers = await listCustomerService.execute({
      country_code,
      valid_phone,
      paginate_number: parseInt(page),
    });

    return response.json(classToClass(customers));
  }
}