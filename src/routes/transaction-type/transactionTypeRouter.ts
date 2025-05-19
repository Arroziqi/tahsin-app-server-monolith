import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { TransactionTypeController } from '../../controllers/transactionTypeController';

export const transactionTypeRouter: Router = express.Router();
transactionTypeRouter.use(adminMiddleware);
transactionTypeRouter.post(
  '/api/transactionType/create',
  TransactionTypeController.create,
);
transactionTypeRouter.patch(
  '/api/transactionType/update',
  TransactionTypeController.update,
);
transactionTypeRouter.get(
  '/api/transactionType/get/:id',
  TransactionTypeController.get,
);
transactionTypeRouter.get(
  '/api/transactionType/getAll',
  TransactionTypeController.getAll,
);
