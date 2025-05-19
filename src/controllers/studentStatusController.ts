import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { StudentStatusService } from '../services/studentStatusService';
import {
  CreateStudentStatusRequest,
  StudentStatusResponse,
  UpdateStudentStatusRequest,
} from '../models/studentStatusModel';

export class StudentStatusController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateStudentStatusRequest =
        req.body as CreateStudentStatusRequest;
      const response: StudentStatusResponse = await StudentStatusService.create(
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
      const request: UpdateStudentStatusRequest =
        req.body as UpdateStudentStatusRequest;
      const response: StudentStatusResponse = await StudentStatusService.update(
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
      const response: StudentStatusResponse =
        await StudentStatusService.get(id);
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
      const response: StudentStatusResponse[] =
        await StudentStatusService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
