import { IAcademicSemester } from '../AcademicSemester/AcademicSemeterInterface';
import { User } from './User.model';

// findLastUserId
const findLastStudentId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id.substring(4) : undefined;
};

// generateUserId
export const generateStudentId = async (
  academicSemester: IAcademicSemester | null,
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  let incrementalId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementalId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementalId}`;
  // console.log(incrementalId);
  return incrementalId;
};

const findLastFacultId = async (): Promise<string | undefined> => {
  const lasFacultytId = await User.findOne(
    { role: 'faculty' },
    { id: 1 },
    { _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lasFacultytId?.id ? lasFacultytId.id.substring(2) : undefined;
};

export const generatFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultId()) || (0).toString().padStart(5, '0');
  let incrementalId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementalId = `F-${incrementalId}`;
  console.log(incrementalId);
  return incrementalId;
};
