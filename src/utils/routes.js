import { Router } from "express";
import { userRouter } from "../users/users.routes.js";
import { productRouter } from "../products/products.routes.js";

export const routes = Router();

routes.use('/users', userRouter);
routes.use('/products', productRouter);