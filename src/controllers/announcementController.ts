import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { AnnouncementService } from '../services/announcementService';
import {
  AnnouncementResponse,
  CreateAnnouncementRequest,
  UpdateAnnouncementRequest,
} from '../models/announcementModel';

export class AnnouncementController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateAnnouncementRequest =
        req.body as CreateAnnouncementRequest;
      const response: AnnouncementResponse = await AnnouncementService.create(
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
      const request: UpdateAnnouncementRequest =
        req.body as UpdateAnnouncementRequest;
      const response: AnnouncementResponse = await AnnouncementService.update(
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
      const response: AnnouncementResponse = await AnnouncementService.get(id);
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
      const response: AnnouncementResponse[] =
        await AnnouncementService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
