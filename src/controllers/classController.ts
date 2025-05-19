import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { ClassService } from '../services/classService';
import {
  ClassResponse,
  CreateClassRequest,
  UpdateClassRequest,
} from '../models/classModel';

export class ClassController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateClassRequest = req.body as CreateClassRequest;
      const response: ClassResponse = await ClassService.create(
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
      const request: UpdateClassRequest = req.body as UpdateClassRequest;
      const response: ClassResponse = await ClassService.update(
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
      const response: ClassResponse = await ClassService.get(id);
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
      const response: ClassResponse[] = await ClassService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
