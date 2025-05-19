import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import {
  CreateTeacherRequest,
  TeacherResponse,
  UpdateTeacherRequest,
} from '../models/teacherModel';
import { TeacherService } from '../services/teacherService';

export class TeacherController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateTeacherRequest = req.body as CreateTeacherRequest;
      const response: TeacherResponse = await TeacherService.create(
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
      const request: UpdateTeacherRequest = req.body as UpdateTeacherRequest;
      const response: TeacherResponse = await TeacherService.update(
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
      const teacherId: number = Number(req.params.teacherId);
      const response: TeacherResponse = await TeacherService.get(teacherId);
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
      const response: TeacherResponse[] = await TeacherService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
