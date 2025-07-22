import { NextFunction, Request, Response } from 'express';
import {
  CreatePaymentFeeRequest,
  UpdatePaymentFeeRequest,
} from '../models/paymentFeeModel';
import { PaymentFeeService } from '../services/paymentFeeService';
import { UserRequest } from '../type/userRequest';

export class PaymentFeeController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await PaymentFeeService.create(
        req.user!,
        req.body as CreatePaymentFeeRequest,
      );
      res.status(201).json({
        success: true,
        data: response,
        message: 'Biaya berhasil dibuat',
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdatePaymentFeeRequest = {
        id: Number(req.params.id),
        ...req.body,
      };
      const response = await PaymentFeeService.update(req.user!, request);
      res.status(200).json({
        success: true,
        data: response,
        message: 'Biaya berhasil diperbarui',
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PaymentFeeService.getAll();
      res.status(200).json({ success: true, data: response });
    } catch (err) {
      next(err);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await PaymentFeeService.get(id);
      res.status(200).json({ success: true, data: response });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const success = await PaymentFeeService.delete(id);
      res.status(200).json({ success, message: 'Biaya berhasil dihapus' });
    } catch (err) {
      next(err);
    }
  }
}
