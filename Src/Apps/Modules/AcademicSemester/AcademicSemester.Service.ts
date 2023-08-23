import ApiError from '../../../Errors/ApiErrors';
import { AcdcSmstrTitleCodeMapper } from './AcademicSemeterConstant';
import { IAcademicSemester } from './AcademicSemeterInterface';
import { AcademicSemester } from './AcademicSemeterModel';
import status from 'http-status-codes';
const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (AcdcSmstrTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid Title code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
