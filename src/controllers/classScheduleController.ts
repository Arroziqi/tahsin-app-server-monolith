import { NextFunction, Response } from 'express';
import { UserRequest } from '../type/userRequest';
import { ClassScheduleService } from '../services/ClassScheduleService';
import {
  CreateClassScheduleRequest,
  UpdateClassScheduleRequest,
} from '../models/classScheduleModel';

export class ClassScheduleController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateClassScheduleRequest = req.body;
      const response = await ClassScheduleService.create(req.user!, request);
      res.status(201).json({
        success: true,
        data: response,
        message: 'Periode akademik berhasil dibuat',
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async update(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: UpdateClassScheduleRequest = {
        id: Number(req.params.id),
        ...req.body,
      };
      const response = await ClassScheduleService.update(req.user!, request);
      res.status(200).json({
        success: true,
        data: response,
        message: 'Periode akademik berhasil diperbarui',
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
      const id: number = Number(req.params.id);
      const success = await ClassScheduleService.delete(req.user!, id);
      res.status(200).json({
        success,
        message: 'Periode akademik berhasil dihapus',
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
      const response = await ClassScheduleService.get(id);
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
      const response = await ClassScheduleService.getAll();
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
