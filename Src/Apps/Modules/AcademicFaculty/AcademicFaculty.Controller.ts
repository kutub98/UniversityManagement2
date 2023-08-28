import { Request, Response } from 'express';
import { catchAsync } from '../../../Shared/catchAsync';
import { AcademicFacultyService } from './AcademicFaculty.Service';
import sendResponse from '../../../Shared/sendResponse';
import { IAcademicFaculty } from './AcademicFaculty.Interface';
import status from 'http-status-codes';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../constant/constant';
import { academicFacultyFilterableFields } from './AcademicFaculty.Constant';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...faculties } = req.body;
  const result = await AcademicFacultyService.createFaculty(faculties);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully create Academic faculty',
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic faculties retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully retrive single Academic faculty',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updataData = req.query;
  const result = await AcademicFacultyService.updateFaculty(id, updataData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully updated single Academic faculty',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully Delete single Academic faculty',
    data: result,
  });
});

export const facultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
