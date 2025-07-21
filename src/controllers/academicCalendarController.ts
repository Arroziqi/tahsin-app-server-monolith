import { NextFunction, Response } from 'express';
import {
  CreateAcademicCalendarRequest,
  UpdateAcademicCalendarRequest,
} from '../models/academicCalendarModel';
import { AcademicCalendarService } from '../services/academicCalendarService';
import { UserRequest } from '../type/userRequest';

export class AcademicCalendarController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateAcademicCalendarRequest = req.body;
      const response = await AcademicCalendarService.create(req.user!, request);
      res.status(201).json({
        success: true,
        data: response,
        message: 'Kalender akademik berhasil dibuat',
      });
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
      const request: UpdateAcademicCalendarRequest = {
        id: Number(req.params.id),
        ...req.body,
      };
      const response = await AcademicCalendarService.update(req.user!, request);
      res.status(200).json({
        success: true,
        data: response,
        message: 'Kalender akademik berhasil diperbarui',
      });
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
      const id = Number(req.params.id);
      const success = await AcademicCalendarService.delete(req.user!, id);
      res.status(200).json({
        success,
        message: 'Kalender akademik berhasil dihapus',
      });
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
      const id = Number(req.params.id);
      const response = await AcademicCalendarService.get(id);
      res.status(200).json({
        success: true,
        data: response,
      });
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
      const response = await AcademicCalendarService.getAll();
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
