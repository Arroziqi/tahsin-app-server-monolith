import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { TransactionController } from '../../controllers/transactionController';

export const transactionRouter: Router = express.Router();
transactionRouter.use(adminMiddleware);
transactionRouter.post('/api/transaction/create', TransactionController.create);
transactionRouter.patch(
  '/api/transaction/update',
  TransactionController.update,
);
transactionRouter.get('/api/transaction/get/:id', TransactionController.get);
transactionRouter.get('/api/transaction/getAll', TransactionController.getAll);
