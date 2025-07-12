import { NextFunction, Response } from 'express';
import { LevelService } from '../services/levelService';
import {
  CreateLevelRequest,
  LevelResponse,
  UpdateLevelRequest,
} from '../models/levelModel';
import { UserRequest } from '../type/userRequest';

export class LevelController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateLevelRequest = req.body as CreateLevelRequest;
      const response: LevelResponse = await LevelService.create(
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
      const request: UpdateLevelRequest = req.body as UpdateLevelRequest;
      const response: LevelResponse = await LevelService.update(
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
      const response: LevelResponse = await LevelService.get(id);
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
      const response: LevelResponse[] = await LevelService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async delete(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id: number = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'ID tidak valid' });
        return;
      }

      const message = await LevelService.delete(id);
      res.status(200).json({ message });
    } catch (e) {
      next(e);
    }
  }
}
