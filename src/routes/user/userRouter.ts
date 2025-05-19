import express, { Router } from 'express';
import { UserController } from '../../controllers/userController';
import { AuthController } from '../../controllers/authController';
import { adminMiddleware } from '../../middlewares/adminMiddleware';

export const userRouter: Router = express.Router();
userRouter.get('/api/user/get', UserController.get);
userRouter.patch('/api/user/update', UserController.update);
userRouter.delete('/api/user/logout', AuthController.logout);
userRouter.use(adminMiddleware);
userRouter.get('/api/user/getAll', UserController.getAll);
userRouter.post('/api/user/create', UserController.create);
