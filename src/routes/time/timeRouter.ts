import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { TimeController } from '../../controllers/timeController';

export const timeRouter: Router = express.Router();
timeRouter.use(adminMiddleware);
timeRouter.post('/api/time/create', TimeController.create);
timeRouter.patch('/api/time/update', TimeController.update);
timeRouter.get('/api/time/get/:id', TimeController.get);
timeRouter.get('/api/time/getAll', TimeController.getAll);
