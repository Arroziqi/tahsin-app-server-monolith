import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { BillController } from '../../controllers/billController';

export const billRouter: Router = express.Router();
billRouter.use(adminMiddleware);
billRouter.post('/api/bill/create', BillController.create);
billRouter.patch('/api/bill/update', BillController.update);
billRouter.get('/api/bill/get/:id', BillController.get);
billRouter.get('/api/bill/getAll', BillController.getAll);
