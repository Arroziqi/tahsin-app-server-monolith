import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import {
  BillResponse,
  CreateBillRequest,
  UpdateBillRequest,
} from '../models/billModel';
import { BillService } from '../services/billService';

export class BillController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateBillRequest = req.body as CreateBillRequest;
      const response: BillResponse = await BillService.create(
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
      const request: UpdateBillRequest = req.body as UpdateBillRequest;
      const response: BillResponse = await BillService.update(
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
      const response: BillResponse = await BillService.get(id);
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
      const response: BillResponse[] = await BillService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
