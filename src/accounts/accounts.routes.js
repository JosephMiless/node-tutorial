import { Router } from "express";
import * as accountController from "./accounts.controllers.js";
import {auth} from '../middleware/auth.js';

export const accountsRouter = Router();

accountsRouter.post('/', auth, accountController.createAccountController);
accountsRouter.get('/', auth, accountController.viewAccountsController);