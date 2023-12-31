import { Request, Response } from 'express';
import { catchAsync } from '../../../Shared/catchAsync';
import { IAcademicDept } from './department.interface';
import { DeptService } from './department.service';
import sendResponse from '../../../Shared/sendResponse';
import status from 'http-status-codes';
import pick from '../../../Shared/pick';
import { academicDepartmentFilterableFields } from './department.constant';
import { paginationFields } from '../../constant/constant';

const createDept = catchAsync(async (req: Request, res: Response) => {
  const { ...deptData } = req.body;
  const result = await DeptService.createAcaDept(deptData);
  sendResponse<IAcademicDept>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully created department',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.body, academicDepartmentFilterableFields);
  const paginations = pick(req.body, paginationFields);
  const result = await DeptService.getAllDepartment(filters, paginations);

  sendResponse<IAcademicDept[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully retrived department',
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DeptService.getSingleDepartment(id);
  sendResponse<IAcademicDept>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully retrived single department data',
    data: result,
  });
});

const updateSingleDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const updateData = req.body;
    const { id } = req.params;
    const result = await DeptService.updateSingleDepartment(id, updateData);
    sendResponse<IAcademicDept>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Successfully updated single Department',
      data: result,
    });
  },
);

const deleteSingleDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DeptService.deleteSingleDepartment(id);
    sendResponse<IAcademicDept>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Successfully delete single Department',
      data: result,
    });
  },
);
export const deptController = {
  createDept,
  getAllDepartment,
  getSingleDepartment,
  updateSingleDepartment,
  deleteSingleDepartment,
};
