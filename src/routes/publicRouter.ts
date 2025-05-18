import express from 'express';
import { authRouter } from './auth/authRouter';

export const publicRouter = express.Router();
publicRouter.use(authRouter);
