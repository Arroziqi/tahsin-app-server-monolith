import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { EnrollmentService } from '../services/enrollmentService';
import {
  CreateEnrollmentRequest,
  EnrollmentResponse,
  UpdateEnrollmentRequest,
} from '../models/enrollmentModel';

export class EnrollmentController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateEnrollmentRequest =
        req.body as CreateEnrollmentRequest;
      const response: EnrollmentResponse = await EnrollmentService.create(
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
      const request: UpdateEnrollmentRequest =
        req.body as UpdateEnrollmentRequest;
      const response: EnrollmentResponse = await EnrollmentService.update(
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
      const response: EnrollmentResponse = await EnrollmentService.get(id);
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
      const response: EnrollmentResponse[] = await EnrollmentService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
