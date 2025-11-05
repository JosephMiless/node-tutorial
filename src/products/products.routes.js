import { Router } from "express";
import * as products from "./prodcuts.controllers.js";
import { adminAuth, auth, staffAuth } from "../middleware/auth.js";

export const productRouter = Router();

productRouter.post('/', auth, staffAuth, products.addProducts);
productRouter.delete('/:id', auth, adminAuth, products.deleteProducts);
productRouter.get('/', products.getAllProdcts);