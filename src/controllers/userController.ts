import { NextFunction, Response } from 'express';
import { UserRequest } from '../type/userRequest';
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../models/userModel';
import { UserService } from '../services/userService';
import { AdminRequest } from '../type/adminRequest';

export class UserController {
  static async update(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response: UserResponse = await UserService.update(
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
      const response: UserResponse = await UserService.get(req.user!);
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
      const response: UserResponse[] = await UserService.getAll();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response: UserResponse = await UserService.create(
        req.user!,
        request,
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
