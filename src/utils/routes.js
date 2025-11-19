import { Router } from "express";
import { userRouter } from "../users/users.routes.js";

export const routes = Router();

routes.use('/users', userRouter);