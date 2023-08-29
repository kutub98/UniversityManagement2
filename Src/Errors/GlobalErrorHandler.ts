/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ErrorLogger } from '../Shared/Logger';
import config from '../../Src/Config/Index';
import { IGenericErrorMessage } from '../Interfaces/Errors';
import ValidationErrorHandler from './ValidationErrorHandler';
import ApiError from './ApiErrors';
import { ZodError } from 'zod';
import ZodErrorHandler from './ZodErrorHandler';
import handlingCastError from './handlingCastError';

const GlobalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  config.env === 'development'
    ? console.log(`GlobalErrorHandler`, { error })
    : ErrorLogger.error(`GlobalErrorHandler`, error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = ValidationErrorHandler(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError?.message),
      (errorMessages = simplifiedError.errorMessages);
  } else if (error.name === 'CastError') {
    const simplifiedError = handlingCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = ZodErrorHandler(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError?.message),
      (errorMessages = simplifiedError.errorMessages);
  } else if (error instanceof ApiError) {
    (statusCode = error?.statusCode),
      (message = error?.message),
      (errorMessages = error?.message
        ? [
            {
              path: ' ',
              message: error?.message,
            },
          ]
        : []);
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: ' ',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default GlobalErrorHandler;
