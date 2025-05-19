import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { ModuleService } from '../services/moduleService';
import {
  CreateModuleRequest,
  ModuleResponse,
  UpdateModuleRequest,
} from '../models/moduleModel';

export class ModuleController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateModuleRequest = req.body as CreateModuleRequest;
      const response: ModuleResponse = await ModuleService.create(
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
      const request: UpdateModuleRequest = req.body as UpdateModuleRequest;
      const response: ModuleResponse = await ModuleService.update(
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
      const response: ModuleResponse = await ModuleService.get(id);
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
      const response: ModuleResponse[] = await ModuleService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
