/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response, RequestHandler } from 'express';

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};