import { Router } from "express";
import { userRouter } from "../users/users.routes.js";
import { accountsRouter } from "../accounts/accounts.routes.js";
import { depositRouter } from "../deposit/deposit.routes.js";

export const routes = Router();

routes.use('/users', userRouter);
routes.use('/accounts', accountsRouter);
routes.use('/deposits', depositRouter); 