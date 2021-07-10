import express from 'express';
import "reflect-metadata";
import cors from 'cors';
import routes from './routes';

import './infra/typeorm';
import './containers';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});