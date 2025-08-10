import { NextFunction, Response } from 'express';
import { EnrollmentService } from '../services/enrollmentService';
import {
  CreateEnrollmentRequest,
  EnrollmentResponse,
  UpdateEnrollmentRequest,
} from '../models/enrollmentModel';
import { UserRequest } from '../type/userRequest';

export class EnrollmentController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateEnrollmentRequest =
        req.body as CreateEnrollmentRequest;
      const response: EnrollmentResponse = await EnrollmentService.create(
        req.user!,
        request,
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async register(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateEnrollmentRequest =
        req.body as CreateEnrollmentRequest;
      const response: EnrollmentResponse = await EnrollmentService.register(
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
      const request: UpdateEnrollmentRequest =
        req.body as UpdateEnrollmentRequest;
      const response: EnrollmentResponse = await EnrollmentService.update(
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
      const response: EnrollmentResponse = await EnrollmentService.get(id);
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
      const response: EnrollmentResponse[] = await EnrollmentService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
