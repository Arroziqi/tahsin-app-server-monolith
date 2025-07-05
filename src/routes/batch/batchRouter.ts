import express, { Router } from 'express';
import { BatchController } from '../../controllers/batchController';

export const batchRouter: Router = express.Router();
batchRouter.post('/api/batch/create', BatchController.create);
batchRouter.patch('/api/batch/update', BatchController.update);
batchRouter.get('/api/batch/get/:id', BatchController.get);
batchRouter.get('/api/batch/getAll', BatchController.getAll);
