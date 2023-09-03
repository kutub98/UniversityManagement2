import { Request, Response } from 'express';
import { catchAsync } from '../../../Shared/catchAsync';
import { studentService } from './student.service';
import pick from '../../../Shared/pick';
import { studentFilterableFields } from './student.constant';
import { paginationFields } from '../../constant/constant';
import sendResponse from '../../../Shared/sendResponse';
import { IStudent } from './student.interface';
import status from 'http-status-codes';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginations = pick(req.query, paginationFields);
  const result = await studentService.getAllStudent(filters, paginations);

  sendResponse<IStudent[] | null>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully all student retrived',
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await studentService.getSingleStudent(id);
  sendResponse<IStudent | null>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully retrived single student data',
    data: result,
  });
});

const updateSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const upadateData = req.body;
  const result = await studentService.updateSingleStudent(id, upadateData);

  sendResponse<IStudent | null>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully update single student data',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.deleteSingleStudent(id);
  sendResponse<IStudent | null>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully delete single student data',
    data: result,
  });
});

export const studentControll = {
  getAllStudent,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
