import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../common/type/responseError';
import { Prisma } from '@prisma/client';

export const errorException = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: `Validation Error : ${JSON.stringify(error, null, 2)}`,
    });
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorMessage = JSON.stringify(error, null, 2);
    const parsedError = JSON.parse(errorMessage.replace(/\\n/g, ''));

    res.status(400).json({
      errors: {
        code: parsedError.code,
        modelName: parsedError.meta.modelName,
        constraint: parsedError.meta.constraint,
        clientVersion: parsedError.clientVersion,
        name: parsedError.name,
      },
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      statusCode: error.status,
      error: error.error,
      message: error.message,
    });
  } else {
    res.status(500).json({
      errors: error.message,
    });
  }
};
