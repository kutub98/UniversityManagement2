import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../Shared/catchAsync';
import { AcademicSemesterService } from './AcademicSemester.Service';
import sendResponse from '../../../Shared/sendResponse';
import status from 'http-status-codes';
import { IAcademicSemester } from './AcademicSemeterInterface';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../constant/constant';

const createSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...AcademicSemester } = req.body;
    const result = await AcademicSemesterService.createSemester(
      AcademicSemester,
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Create user successfully',
      data: result,
    });
    next();
  },
);

// get all semester
const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.query, ['searchTerm']);
    const result = await AcademicSemesterService.getAllSemseter(
      filters,
      paginationOptions,
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic Semesters retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
    next();
  },
);

// export
export const AcademicSemesterController = {
  createSemesters,
  getAllSemester,
};
