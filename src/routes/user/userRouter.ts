import express, { Router } from 'express';
import { UserController } from '../../controllers/userController';
import { AuthController } from '../../controllers/authController';

export const userRouter: Router = express.Router();
userRouter.get('/api/user/get', UserController.get);
userRouter.patch('/api/user/update', UserController.update);
userRouter.delete('/api/user/logout', AuthController.logout);
userRouter.get('/api/user/getAll', UserController.getAll);
userRouter.post('/api/user/create', UserController.create);
