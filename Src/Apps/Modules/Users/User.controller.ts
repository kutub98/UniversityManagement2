import UserService from './User.service';
import { catchAsync } from '../../../Shared/catchAsync';
import { Request, RequestHandler, Response } from 'express';

import status from 'http-status-codes';
import { IUSER } from './User.Interface';
import sendResponse from '../../../Shared/sendResponse';

const creatUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { users } = req.body;
    const result = await UserService.createUser(users);

    sendResponse<IUSER>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Create user successfully',
      data: result,
    });
  },
);

export default {
  creatUser,
};
