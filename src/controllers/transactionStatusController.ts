import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { TransactionStatusService } from '../services/transactionStatusService';
import {
  CreateTransactionStatusRequest,
  TransactionStatusResponse,
  UpdateTransactionStatusRequest,
} from '../models/transactionStatusModel';

export class TransactionStatusController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateTransactionStatusRequest =
        req.body as CreateTransactionStatusRequest;
      const response: TransactionStatusResponse =
        await TransactionStatusService.create(req.admin!, request);
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
      const request: UpdateTransactionStatusRequest =
        req.body as UpdateTransactionStatusRequest;
      const response: TransactionStatusResponse =
        await TransactionStatusService.update(req.admin!, request);
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
      const response: TransactionStatusResponse =
        await TransactionStatusService.get(id);
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
      const response: TransactionStatusResponse[] =
        await TransactionStatusService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
