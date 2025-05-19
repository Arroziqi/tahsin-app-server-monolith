import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import {
  BankAccountResponse,
  CreateBankAccountRequest,
  UpdateBankAccountRequest,
} from '../models/bankAccountModel';
import { BankAccountService } from '../services/bankAccountService';

export class BankAccountController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateBankAccountRequest =
        req.body as CreateBankAccountRequest;
      const response: BankAccountResponse = await BankAccountService.create(
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
      const request: UpdateBankAccountRequest =
        req.body as UpdateBankAccountRequest;
      const response: BankAccountResponse = await BankAccountService.update(
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
      const response: BankAccountResponse = await BankAccountService.get(id);
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
      const response: BankAccountResponse[] = await BankAccountService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
