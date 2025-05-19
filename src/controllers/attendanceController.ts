import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { AttendanceService } from '../services/attendanceService';
import {
  AttendanceResponse,
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
} from '../models/attendanceModel';

export class AttendanceController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateAttendanceRequest =
        req.body as CreateAttendanceRequest;
      const response: AttendanceResponse = await AttendanceService.create(
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
      const request: UpdateAttendanceRequest =
        req.body as UpdateAttendanceRequest;
      const response: AttendanceResponse = await AttendanceService.update(
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
      const response: AttendanceResponse = await AttendanceService.get(id);
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
      const response: AttendanceResponse[] = await AttendanceService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
