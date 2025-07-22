import express, { Router } from 'express';
import { PaymentFeeController } from '../../controllers/paymentFeeController';

export const paymentFeeRouter: Router = express.Router();

paymentFeeRouter.post('/api/paymentFee/create', PaymentFeeController.create);
paymentFeeRouter.patch('/api/paymentFee/update', PaymentFeeController.update);
paymentFeeRouter.get('/api/paymentFee/get/:id', PaymentFeeController.get);
paymentFeeRouter.get('/api/paymentFee/getAll', PaymentFeeController.getAll);
paymentFeeRouter.delete(
  '/api/paymentFee/delete/:id',
  PaymentFeeController.delete,
);
