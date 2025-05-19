import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { LevelService } from '../services/levelService';
import {
  CreateLevelRequest,
  LevelResponse,
  UpdateLevelRequest,
} from '../models/levelModel';

export class LevelController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateLevelRequest = req.body as CreateLevelRequest;
      const response: LevelResponse = await LevelService.create(
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
      const request: UpdateLevelRequest = req.body as UpdateLevelRequest;
      const response: LevelResponse = await LevelService.update(
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
      const response: LevelResponse = await LevelService.get(id);
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
      const response: LevelResponse[] = await LevelService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
