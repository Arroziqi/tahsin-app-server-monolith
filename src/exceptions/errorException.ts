import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { BadRequest } from './error/badRequest';

export const errorException = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: `Validation Error : ${JSON.stringify(error)}`,
    });
  } else if (error instanceof BadRequest) {
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
