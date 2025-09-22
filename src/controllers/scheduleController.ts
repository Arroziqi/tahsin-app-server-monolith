import { NextFunction, Response } from 'express';
import { ScheduleService } from '../services/scheduleService';
import {
  CreateScheduleRequest,
  ScheduleResponse,
  UpdateScheduleRequest,
} from '../models/scheduleModel';
import { UserRequest } from '../type/userRequest';
import { ClassType } from '@prisma/client';

export class ScheduleController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateScheduleRequest = req.body as CreateScheduleRequest;
      const response: ScheduleResponse = await ScheduleService.create(
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
      const request: UpdateScheduleRequest = req.body as UpdateScheduleRequest;
      const response: ScheduleResponse = await ScheduleService.update(
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
      const response: ScheduleResponse = await ScheduleService.get(id);
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
      const response: ScheduleResponse[] = await ScheduleService.getAll();
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
      await ScheduleService.delete(id);
      res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (e) {
      next(e);
    }
  }

  static async getAssignedInPreferredSchedule(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response: ScheduleResponse[] =
        await ScheduleService.getAssignedInPreferredSchedule();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async getByClassType(req: UserRequest, res: Response): Promise<void> {
    try {
      const { classType } = req.params;

      if (!Object.values(ClassType).includes(classType as ClassType)) {
        res.status(400).json({ message: 'Invalid classType parameter' });
        return;
      }

      const schedules = await ScheduleService.getByClassType(
        classType as ClassType,
      );

      res.status(200).json({ data: schedules });
    } catch (error) {
      console.error('Error fetching schedules by classType:', error);
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
