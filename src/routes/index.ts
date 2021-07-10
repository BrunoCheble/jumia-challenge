import { Router } from 'express';

import customersRouter from '../infra/http/routes/customers.routes';

const routes = Router();

routes.use('/customers', customersRouter);

export default routes;