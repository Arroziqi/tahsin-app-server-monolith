import { NextFunction, Request, Response } from 'express';
import {
  CreateUserRequest,
  LoginUserRequest,
  UserResponse,
} from '../models/userModel';
import { UserService } from '../services/userService';
import { UserRequest } from '../type/userRequest';

export class AuthController {
  static login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response: UserResponse = await UserService.login(request);
      res.status(200).json({ data: response });
    } catch (e) {
      console.log('ini errornya', e);
      next(e);
    }
  };

  static register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response: UserResponse = await UserService.register(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  };

  static logout = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const response: string = await UserService.logout(req.user!);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  };
}
