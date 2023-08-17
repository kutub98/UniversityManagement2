/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../Interfaces/Errors';
import { IGenericErrorResponse } from '../Interfaces/Common';

const ValidationErrorHandler = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default ValidationErrorHandler;
