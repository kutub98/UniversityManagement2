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

export const studentControll = {
  getAllStudent,
};
