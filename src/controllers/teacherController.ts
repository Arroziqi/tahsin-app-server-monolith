import { NextFunction, Response } from 'express';
import {
  CreateTeacherRequest,
  CreateUserTeacherRequest,
  TeacherResponse,
  UpdateTeacherRequest,
  UpdateTeacherStatusRequest,
} from '../models/teacherModel';
import { TeacherService } from '../services/teacherService';
import { UserRequest } from '../type/userRequest';

export class TeacherController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateTeacherRequest = req.body as CreateTeacherRequest;
      const response: TeacherResponse = await TeacherService.create(
        req.user!,
        request,
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async createUserTeacher(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateUserTeacherRequest =
        req.body as CreateUserTeacherRequest;
      const response: TeacherResponse = await TeacherService.createUserTeacher(
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
      const request: UpdateTeacherRequest = req.body as UpdateTeacherRequest;
      const response: TeacherResponse = await TeacherService.update(
        req.user!,
        request,
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async updateTeacherStatus(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: UpdateTeacherStatusRequest =
        req.body as UpdateTeacherStatusRequest;
      const response: TeacherResponse = await TeacherService.updateStatus(
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
      const teacherId: number = Number(req.params.teacherId);
      const response: TeacherResponse = await TeacherService.get(teacherId);
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
      const response: TeacherResponse[] = await TeacherService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
