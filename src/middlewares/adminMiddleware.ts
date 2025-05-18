import { NextFunction, Response } from 'express';
import { dbClient } from '../common/provider/database';
import { AdminRequest } from '../type/adminRequest';

export const adminMiddleware = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.get('X-API-Token');

  if (token) {
    const user = await dbClient.user.findFirst({
      where: {
        token,
      },
    });

    if (user) {
      const admin = await dbClient.admin.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (admin) {
        req.admin = admin;
        next();
        return;
      }
    }
  }

  res
    .status(401)
    .json({
      error: 'Unauthorized',
    })
    .end();
};
