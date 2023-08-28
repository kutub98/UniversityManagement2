import { Request, Response } from 'express';
import { catchAsync } from '../../../Shared/catchAsync';
import { AcademicSemesterService } from './AcademicSemester.Service';
import sendResponse from '../../../Shared/sendResponse';
import status from 'http-status-codes';
import { IAcademicSemester } from './AcademicSemeterInterface';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../constant/constant';

const createSemesters = catchAsync(async (req: Request, res: Response) => {
  const { ...AcademicSemester } = req.body;
  const result = await AcademicSemesterService.createSemester(AcademicSemester);

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Create user successfully',
    data: result,
  });
});

// get all semester
const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, ['searchTerm', 'title', 'year', 'code']);
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
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: ' Single Semester data retrived successfully',
    data: result,
  });
});

const updateSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const resut = await AcademicSemesterService.updateSingleSemester(
    id,
    updateData,
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Update Single Academic Semester',
    data: resut,
  });
});

const DeleteSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.DeleteSingleSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: ' Single Semester deleted successfully',
    data: result,
  });
});

// export
export const AcademicSemesterController = {
  createSemesters,
  getAllSemester,
  getSingleSemester,
  updateSingleSemester,
  DeleteSingleSemester,
};
