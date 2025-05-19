import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { ClassPriceController } from '../../controllers/classPriceController';

export const classPriceRouter: Router = express.Router();
classPriceRouter.use(adminMiddleware);
classPriceRouter.post('/api/classPrice/create', ClassPriceController.create);
classPriceRouter.patch('/api/classPrice/update', ClassPriceController.update);
classPriceRouter.get('/api/classPrice/get/:id', ClassPriceController.get);
classPriceRouter.get('/api/classPrice/getAll', ClassPriceController.getAll);
