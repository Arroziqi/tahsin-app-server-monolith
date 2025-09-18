import express, { Router } from 'express';
import { ClassScheduleController } from '../../controllers/classScheduleController';

export const classScheduleRouter: Router = express.Router();
classScheduleRouter.post(
  '/api/class-schedule/create',
  ClassScheduleController.create,
);
classScheduleRouter.patch(
  '/api/class-schedule/update',
  ClassScheduleController.update,
);
classScheduleRouter.get(
  '/api/class-schedule/get/:id',
  ClassScheduleController.get,
);
classScheduleRouter.get(
  '/api/class-schedule/getAll',
  ClassScheduleController.getAll,
);
classScheduleRouter.delete(
  '/api/class-schedule/delete/:id',
  ClassScheduleController.delete,
);
