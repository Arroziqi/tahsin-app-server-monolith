import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { TransactionService } from '../services/transactionService';
import {
  CreateTransactionRequest,
  TransactionResponse,
  UpdateTransactionRequest,
} from '../models/transactionModel';

export class TransactionController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateTransactionRequest =
        req.body as CreateTransactionRequest;
      const response: TransactionResponse = await TransactionService.create(
        req.admin!,
        request,
      );
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
      const request: UpdateTransactionRequest =
        req.body as UpdateTransactionRequest;
      const response: TransactionResponse = await TransactionService.update(
        req.admin!,
        request,
      );
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
      const response: TransactionResponse = await TransactionService.get(id);
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
      const response: TransactionResponse[] = await TransactionService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
