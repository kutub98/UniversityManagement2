import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../Shared/catchAsync';
import { AcademicSemesterService } from './AcademicSemester.Service';
import { sendResponse } from '../../../Shared/sendResponse';
import status from 'http-status-codes';
const createSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...AcademicSemester } = req.body;
    const result = await AcademicSemesterService.createSemester(
      AcademicSemester,
    );
    next();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Create user successfully',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  createSemesters,
};
