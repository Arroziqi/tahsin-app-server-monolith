import { NextFunction, Response } from 'express';
import { AdminRequest } from '../type/adminRequest';
import { TaskService } from '../services/taskService';
import {
  CreateTaskRequest,
  TaskResponse,
  UpdateTaskRequest,
} from '../models/taskModel';

export class TaskController {
  static async create(
    req: AdminRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateTaskRequest = req.body as CreateTaskRequest;
      const response: TaskResponse = await TaskService.create(
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
      const request: UpdateTaskRequest = req.body as UpdateTaskRequest;
      const response: TaskResponse = await TaskService.update(
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
      const response: TaskResponse = await TaskService.get(id);
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
      const response: TaskResponse[] = await TaskService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
