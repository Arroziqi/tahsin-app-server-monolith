import { NextFunction, Response } from 'express';
import { Role } from '@prisma/client';
import { UserRequest } from '../type/userRequest';

export function requireRole(roles: Role[]) {
  return (req: UserRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        message: `Forbidden: Requires ${roles} role anda ${req.user?.role}`,
      });
      return;
    }

    next();
  };
}
