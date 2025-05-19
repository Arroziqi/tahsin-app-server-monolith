import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { ComponentService } from '../services/componentService';
import {
  ComponentResponse,
  CreateComponentRequest,
  UpdateComponentRequest,
} from '../models/componentModel';

export class ComponentController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateComponentRequest =
        req.body as CreateComponentRequest;
      const response: ComponentResponse = await ComponentService.create(
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
      const request: UpdateComponentRequest =
        req.body as UpdateComponentRequest;
      const response: ComponentResponse = await ComponentService.update(
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
      const response: ComponentResponse = await ComponentService.get(id);
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
      const response: ComponentResponse[] = await ComponentService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
