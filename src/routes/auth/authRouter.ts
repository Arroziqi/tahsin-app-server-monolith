import express, { Router } from 'express';
import { AuthController } from '../../controllers/authController';

export const authRouter: Router = express.Router();
authRouter.post('/api/login', AuthController.login);
authRouter.post('/api/register', AuthController.register);
