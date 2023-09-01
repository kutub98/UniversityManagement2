import UserService from './User.service';
import { catchAsync } from '../../../Shared/catchAsync';
import { Request, RequestHandler, Response } from 'express';

import status from 'http-status-codes';
import { IUSER } from './User.Interface';
import sendResponse from '../../../Shared/sendResponse';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...user } = req.body;
    const result = await UserService.createStudent(student, user);

    sendResponse<IUSER>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Create user successfully',
      data: result,
    });
  },
);

export default {
  createStudent,
};
