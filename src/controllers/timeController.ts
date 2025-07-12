import { NextFunction, Response } from 'express';
import {
  CreateTimeRequest,
  TimeResponse,
  UpdateTimeRequest,
} from '../models/timeModel';
import { TimeService } from '../services/timeService';
import { UserRequest } from '../type/userRequest';

export class TimeController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateTimeRequest = req.body as CreateTimeRequest;
      const response: TimeResponse = await TimeService.create(
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
      const request: UpdateTimeRequest = req.body as UpdateTimeRequest;
      const response: TimeResponse = await TimeService.update(
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
      const response: TimeResponse = await TimeService.get(id);
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
      const response: TimeResponse[] = await TimeService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
