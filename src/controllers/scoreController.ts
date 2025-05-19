import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { ScoreService } from '../services/scoreService';
import {
  CreateScoreRequest,
  ScoreResponse,
  UpdateScoreRequest,
} from '../models/scoreModel';

export class ScoreController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateScoreRequest = req.body as CreateScoreRequest;
      const response: ScoreResponse = await ScoreService.create(
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
      const request: UpdateScoreRequest = req.body as UpdateScoreRequest;
      const response: ScoreResponse = await ScoreService.update(
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
      const response: ScoreResponse = await ScoreService.get(id);
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
      const response: ScoreResponse[] = await ScoreService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
