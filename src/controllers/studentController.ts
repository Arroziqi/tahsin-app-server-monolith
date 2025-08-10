import { NextFunction, Response } from 'express';
import { StudentService } from '../services/studentService';
import {
  CreateStudentRequest,
  StudentResponse,
  UpdateStudentRequest,
} from '../models/studentModel';
import { UserRequest } from '../type/userRequest';

export class StudentController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateStudentRequest = req.body as CreateStudentRequest;
      const response: StudentResponse = await StudentService.create(
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
      const request: UpdateStudentRequest = req.body as UpdateStudentRequest;
      const response: StudentResponse = await StudentService.update(
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
      const response: StudentResponse = await StudentService.get(id);
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
      const response: StudentResponse[] = await StudentService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
