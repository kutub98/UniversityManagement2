import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../Interfaces/Errors';

const handlingCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid ID',
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};
export default handlingCastError;
