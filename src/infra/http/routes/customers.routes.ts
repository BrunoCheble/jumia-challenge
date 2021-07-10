import { Router, Request, Response } from 'express';
import CustomersController from '../controllers/CustomersController';

const customersController = new CustomersController();
const customersRouter = Router();

customersRouter.get(
  '/list/:country_code/:valid_phone/:page',
  customersController.list,
);

export default customersRouter;