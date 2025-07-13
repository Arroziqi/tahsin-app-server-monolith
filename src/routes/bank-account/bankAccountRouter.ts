import express, { Router } from 'express';
import { BankAccountController } from '../../controllers/bankAccountController';

export const bankAccountRouter: Router = express.Router();
bankAccountRouter.post('/api/bankAccount/create', BankAccountController.create);
bankAccountRouter.patch(
  '/api/bankAccount/update',
  BankAccountController.update,
);
bankAccountRouter.get('/api/bankAccount/get/:id', BankAccountController.get);
bankAccountRouter.get('/api/bankAccount/getAll', BankAccountController.getAll);
bankAccountRouter.delete(
  '/api/bankAccount/delete/:id',
  BankAccountController.delete,
);
