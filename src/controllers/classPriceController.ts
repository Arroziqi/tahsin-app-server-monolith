import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { ClassPriceService } from '../services/classPriceService';
import {
  ClassPriceResponse,
  CreateClassPriceRequest,
  UpdateClassPriceRequest,
} from '../models/classPriceModel';

export class ClassPriceController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateClassPriceRequest =
        req.body as CreateClassPriceRequest;
      const response: ClassPriceResponse = await ClassPriceService.create(
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
      const request: UpdateClassPriceRequest =
        req.body as UpdateClassPriceRequest;
      const response: ClassPriceResponse = await ClassPriceService.update(
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
      const response: ClassPriceResponse = await ClassPriceService.get(id);
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
      const response: ClassPriceResponse[] = await ClassPriceService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
