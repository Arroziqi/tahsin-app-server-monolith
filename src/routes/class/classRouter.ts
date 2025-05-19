import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { ClassController } from '../../controllers/classController';

export const classRouter: Router = express.Router();
classRouter.use(adminMiddleware);
classRouter.post('/api/class/create', ClassController.create);
classRouter.patch('/api/class/update', ClassController.update);
classRouter.get('/api/class/get/:id', ClassController.get);
classRouter.get('/api/class/getAll', ClassController.getAll);
