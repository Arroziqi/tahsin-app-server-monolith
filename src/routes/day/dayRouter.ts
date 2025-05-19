import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { DayController } from '../../controllers/dayController';

export const dayRouter: Router = express.Router();
dayRouter.use(adminMiddleware);
dayRouter.post('/api/day/create', DayController.create);
dayRouter.patch('/api/day/update', DayController.update);
dayRouter.get('/api/day/get/:id', DayController.get);
dayRouter.get('/api/day/getAll', DayController.getAll);
