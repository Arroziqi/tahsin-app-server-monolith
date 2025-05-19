import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import {
  CreateTimeRequest,
  TimeResponse,
  UpdateTimeRequest,
} from '../models/timeModel';
import { TimeService } from '../services/timeService';

export class TimeController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateTimeRequest = req.body as CreateTimeRequest;
      const response: TimeResponse = await TimeService.create(
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
      const request: UpdateTimeRequest = req.body as UpdateTimeRequest;
      const response: TimeResponse = await TimeService.update(
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
      const response: TimeResponse = await TimeService.get(id);
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
      const response: TimeResponse[] = await TimeService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
