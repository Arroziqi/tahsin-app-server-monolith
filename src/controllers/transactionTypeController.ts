import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { TransactionTypeService } from '../services/transactionTypeService';
import {
  CreateTransactionTypeRequest,
  TransactionTypeResponse,
  UpdateTransactionTypeRequest,
} from '../models/transactionTypeModel';

export class TransactionTypeController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateTransactionTypeRequest =
        req.body as CreateTransactionTypeRequest;
      const response: TransactionTypeResponse =
        await TransactionTypeService.create(req.admin!, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async update(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: UpdateTransactionTypeRequest =
        req.body as UpdateTransactionTypeRequest;
      const response: TransactionTypeResponse =
        await TransactionTypeService.update(req.admin!, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async get(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const response: TransactionTypeResponse =
        await TransactionTypeService.get(id);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async getAll(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response: TransactionTypeResponse[] =
        await TransactionTypeService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
