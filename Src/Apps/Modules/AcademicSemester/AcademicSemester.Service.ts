import { IAcademicSemester } from './AcademicSemeterInterface';
import { AcademicSemester } from './AcademicSemeterModel';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
