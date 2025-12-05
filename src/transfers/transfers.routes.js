import { Router } from "express";
import { transferController } from "./transfers.controllers.js";
import {auth} from "../middleware/auth.js";

export const transferRouter = Router();

transferRouter.post('/', auth, transferController);