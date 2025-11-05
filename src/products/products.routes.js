import { Router } from "express";
import * as products from "./prodcuts.controllers.js";

export const productRouter = Router();

productRouter.post('/', products.addProducts);
productRouter.delete('/:id', products.deleteProducts);
productRouter.get('/', products.getAllProdcts);
