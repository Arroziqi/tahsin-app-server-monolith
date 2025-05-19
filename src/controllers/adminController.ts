import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { AdminService } from '../services/adminService';
import {
  AdminResponse,
  CreateAdminRequest,
  UpdateAdminRequest,
} from '../models/adminModel';

export class AdminController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateAdminRequest = req.body as CreateAdminRequest;
      const response: AdminResponse = await AdminService.create(
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
      const request: UpdateAdminRequest = req.body as UpdateAdminRequest;
      const response: AdminResponse = await AdminService.update(
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
      const response: AdminResponse = await AdminService.get(id);
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
      const response: AdminResponse[] = await AdminService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
