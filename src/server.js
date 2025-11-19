import express from 'express';
import { config } from './config/env.js';
import { routes } from './utils/routes.js';
import { initDB } from './models/index.js';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(config.port, async () => {
  try {
    
    await initDB();
    console.log(`server running on ${config.port}`);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});