import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { TaskController } from '../../controllers/taskController';

export const taskRouter: Router = express.Router();
taskRouter.use(adminMiddleware);
taskRouter.post('/api/task/create', TaskController.create);
taskRouter.patch('/api/task/update', TaskController.update);
taskRouter.get('/api/task/get/:id', TaskController.get);
taskRouter.get('/api/task/getAll', TaskController.getAll);
