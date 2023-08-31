import { User } from './User.model';
import { IUSER } from './User.Interface';
import config from '../../../Config/Index';
import { generateStudentId } from './User.Utils';
import ApiError from '../../../Errors/ApiErrors';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../AcademicSemester/AcademicSemeterModel';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import status from 'http-status-codes';

const createStudent = async (
  student: IStudent,
  users: IUSER,
): Promise<IUSER | null> => {
  // setup default password
  if (!users.password) {
    users.password = config.StudentPassword as string;
  }

  // set role
  users.role = 'student';
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  ).lean();

  let newAllUserData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    users.id = id;
    student.id = id;
    const newStudent = await Student.create([student], { session });
    // newStudent
    if (!newStudent.length) {
      throw new ApiError(status.BAD_REQUEST, 'Field to create student');
    }
    users.student = newStudent[0]._id;
    // newUser
    const newUser = await User.create([users], { session });
    if (!newUser.length) {
      throw new ApiError(status.BAD_REQUEST, 'Field to create user');
    }
    newAllUserData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    // throw error
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newAllUserData) {
    newAllUserData = await User.findOne({ id: newAllUserData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newAllUserData;
};

export default {
  createStudent,
};
