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
import { IAcademicSemester } from '../AcademicSemester/AcademicSemeterInterface';

const createStudent = async (
  student: IStudent,
  user: IUSER,
): Promise<IUSER | null> => {
  // setup default password
  if (!user.password) {
    user.password = config.StudentPassword as string;
  }

  // set role
  user.role = 'student';
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  ).lean();

  let newAllUserData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester as IAcademicSemester);
    user.id = id;
    student.id = id;
    const newStudent = await Student.create([student], { session });
    console.log(newStudent, id, 'id', 'Student');
    // newStudent
    if (!newStudent.length) {
      throw new ApiError(status.BAD_REQUEST, 'Field to create student');
    }

    user.student = newStudent[0]._id;
    // newUser

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(status.BAD_REQUEST, 'Field to create user');
    }
    console.log(newUser, 'newUser');
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
