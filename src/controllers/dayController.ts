import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import {
  CreateDayRequest,
  DayResponse,
  UpdateDayRequest,
} from '../models/dayModel';
import { DayService } from '../services/dayService';

export class DayController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateDayRequest = req.body as CreateDayRequest;
      const response: DayResponse = await DayService.create(
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
      const request: UpdateDayRequest = req.body as UpdateDayRequest;
      const response: DayResponse = await DayService.update(
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
      const response: DayResponse = await DayService.get(id);
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
      const response: DayResponse[] = await DayService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
