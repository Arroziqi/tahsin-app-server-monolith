import express, { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { userRouter } from './user/userRouter';
import { teacherRouter } from './teacher/teacherRouter';
import { levelRouter } from './level/levelRouter';
import { timeRouter } from './time/timeRouter';

export const router: Router = express.Router();
router.use(authMiddleware);
router.use(userRouter);
router.use(teacherRouter);
router.use(levelRouter);
router.use(timeRouter);
