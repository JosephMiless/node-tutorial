import { Router } from "express";
import { createDepositController } from "./deposit.controllers.js";
import {auth} from "../middleware/auth.js"

export const depositRouter = Router();

depositRouter.post('/', auth, createDepositController);