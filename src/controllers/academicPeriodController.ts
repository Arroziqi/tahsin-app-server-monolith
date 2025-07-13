import { NextFunction, Response } from 'express';
import {
  CreateAcademicPeriodRequest,
  UpdateAcademicPeriodRequest,
} from '../models/academicPeriodModel';
import { AcademicPeriodService } from '../services/academicPeriodService';
import { UserRequest } from '../type/userRequest';

export class AcademicPeriodController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateAcademicPeriodRequest = req.body;
      const response = await AcademicPeriodService.create(req.user!, request);
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
      const request: UpdateAcademicPeriodRequest = {
        id: Number(req.params.id),
        ...req.body,
      };
      const response = await AcademicPeriodService.update(req.user!, request);
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
      const id = Number(req.params.id);
      const success = await AcademicPeriodService.delete(req.user!, id);
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
      const response = await AcademicPeriodService.get(id);
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
      const response = await AcademicPeriodService.getAll();
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
