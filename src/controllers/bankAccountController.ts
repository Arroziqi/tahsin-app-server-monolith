import { NextFunction, Response } from 'express';
import {
  BankAccountResponse,
  CreateBankAccountRequest,
  UpdateBankAccountRequest,
} from '../models/bankAccountModel';
import { BankAccountService } from '../services/bankAccountService';
import { UserRequest } from '../type/userRequest';

export class BankAccountController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateBankAccountRequest =
        req.body as CreateBankAccountRequest;
      const response: BankAccountResponse = await BankAccountService.create(
        req.user!,
        request,
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async update(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: UpdateBankAccountRequest =
        req.body as UpdateBankAccountRequest;
      const response: BankAccountResponse = await BankAccountService.update(
        req.user!,
        request,
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async get(
    req: UserRequest,
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
    req: UserRequest,
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

  static async delete(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const success: boolean = await BankAccountService.delete(req.user!, id);
      res.status(200).json({
        success,
        message: 'Bank account deleted successfully',
      });
    } catch (e) {
      next(e);
    }
  }
}
