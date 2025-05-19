import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { BatchService } from '../services/batchService';
import {
  BatchResponse,
  CreateBatchRequest,
  UpdateBatchRequest,
} from '../models/batchModel';

export class BatchController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateBatchRequest = req.body as CreateBatchRequest;
      const response: BatchResponse = await BatchService.create(
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
      const request: UpdateBatchRequest = req.body as UpdateBatchRequest;
      const response: BatchResponse = await BatchService.update(
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
      const response: BatchResponse = await BatchService.get(id);
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
      const response: BatchResponse[] = await BatchService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
