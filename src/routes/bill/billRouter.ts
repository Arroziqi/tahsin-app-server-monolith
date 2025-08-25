import express, { Router } from 'express';
import { BillController } from '../../controllers/billController';

export const billRouter: Router = express.Router();
billRouter.post('/api/bill/create', BillController.create);
billRouter.patch('/api/bill/update', BillController.update);
billRouter.get('/api/bill/get/:id', BillController.get);
billRouter.get(
  '/api/bill/get-by-student-id/:id',
  BillController.getByStudentId,
);
billRouter.get('/api/bill/getAll', BillController.getAll);
