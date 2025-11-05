import express from 'express';
import { config } from './config/env.js';
import { routes } from './utils/routes.js';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(config.port, () => {
  console.log(`server1 running on ${config.port}`);
});