import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../Interfaces/Errors';
import { IGenericErrorResponse } from '../Interfaces/Common';

const ZodErrorHandler = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default ZodErrorHandler;
