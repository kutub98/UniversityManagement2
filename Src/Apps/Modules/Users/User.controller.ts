import UserService from './User.service';
import { catchAsync } from '../../../Shared/catchAsync';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { sendResponse } from '../../../Shared/sendResponse';
import status from 'http-status-codes';
import { IUSER } from './User.Interface';
const creatUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { users } = req.body;
    const result = await UserService.createUser(users);

    sendResponse<IUSER>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Create user successfully',
      data: result,
    });
    next();
  },
);

export default {
  creatUser,
};
