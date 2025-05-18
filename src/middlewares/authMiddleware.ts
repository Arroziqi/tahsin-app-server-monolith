import { NextFunction, Response } from 'express';
import { dbClient } from '../common/provider/database';
import { UserRequest } from '../type/userRequest';

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  const token: string | undefined = req.get('X-API-TOKEN');

  if (token) {
    const user = await dbClient.user.findFirst({
      where: {
        token: token,
      },
    });

    if (user) {
      req.user = user;
      next();
      return;
    }
  }

  res
    .status(401)
    .json({
      error: 'Unauthorized',
    })
    .end();
};
