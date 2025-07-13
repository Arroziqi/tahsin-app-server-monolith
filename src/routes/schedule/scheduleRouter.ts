import express, { Router } from 'express';
import { ScheduleController } from '../../controllers/scheduleController';

export const scheduleRouter: Router = express.Router();
scheduleRouter.post('/api/schedule/create', ScheduleController.create);
scheduleRouter.patch('/api/schedule/update', ScheduleController.update);
scheduleRouter.get('/api/schedule/get/:id', ScheduleController.get);
scheduleRouter.get('/api/schedule/getAll', ScheduleController.getAll);
scheduleRouter.delete('/api/schedule/delete/:id', ScheduleController.delete);
