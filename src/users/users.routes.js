import { Router } from "express";
import * as userController from "./users.controllers.js";

export const userRouter = Router();

userRouter.post('/signup', userController.signUpUserController);
userRouter.post('/login', userController.loginUserController);
userRouter.get('/', userController.getUserController);
userRouter.patch('/edit/:id', userController.editUserDetailsController);