import { RequestHandler } from 'express';
import { AcademicSemesterService } from './AcademicSemester.Service';

const createSemesters: RequestHandler = async (req, res, next) => {
  try {
    const { ...AcademicSemester } = req.body;
    const result = await AcademicSemesterService.createSemester(
      AcademicSemester,
    );
    res.status(200).json({
      success: true,
      message: 'Successfully created Semester',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createSemesters,
};
