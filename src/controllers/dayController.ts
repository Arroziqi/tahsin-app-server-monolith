import { NextFunction, Response } from 'express';
import {
  CreateDayRequest,
  DayResponse,
  UpdateDayRequest,
} from '../models/dayModel';
import { DayService } from '../services/dayService';
import { UserRequest } from '../type/userRequest';

export class DayController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateDayRequest = req.body as CreateDayRequest;
      const response: DayResponse = await DayService.create(req.user!, request);
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
      const request: UpdateDayRequest = req.body as UpdateDayRequest;
      const response: DayResponse = await DayService.update(req.user!, request);
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
      const response: DayResponse = await DayService.get(id);
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
      const response: DayResponse[] = await DayService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
