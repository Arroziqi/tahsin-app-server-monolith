import { NextFunction, Response } from 'express';
import {
  CreateEventRequest,
  EventResponse,
  UpdateEventRequest,
} from '../models/eventModel';
import { EventService } from '../services/eventService';
import { UserRequest } from '../type/userRequest';

export class EventController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateEventRequest = req.body;
      const response: EventResponse = await EventService.create(
        req.user!,
        request,
      );
      res.status(200).json({
        success: true,
        data: response,
        message: 'Event berhasil ditambahkan',
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
      const request: UpdateEventRequest = req.body;
      const response: EventResponse = await EventService.update(
        req.user!,
        request,
      );
      res.status(200).json({
        success: true,
        data: response,
        message: 'Event berhasil diperbarui',
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
      const success = await EventService.delete(req.user!, id);
      res.status(200).json({
        success,
        message: 'Event berhasil dihapus',
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
      const id: number = Number(req.params.id);
      const response: EventResponse = await EventService.get(id);
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
      const response: EventResponse[] = await EventService.getAll();
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
