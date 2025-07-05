import express, { Router } from 'express';
import { TransactionStatusController } from '../../controllers/transactionStatusController';

export const transactionStatusRouter: Router = express.Router();
transactionStatusRouter.post(
  '/api/transactionStatus/create',
  TransactionStatusController.create,
);
transactionStatusRouter.patch(
  '/api/transactionStatus/update',
  TransactionStatusController.update,
);
transactionStatusRouter.get(
  '/api/transactionStatus/get/:id',
  TransactionStatusController.get,
);
transactionStatusRouter.get(
  '/api/transactionStatus/getAll',
  TransactionStatusController.getAll,
);
