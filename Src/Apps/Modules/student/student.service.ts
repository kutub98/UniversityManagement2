/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../../../Interfaces/paginations';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { IGenericResponse } from '../../../Interfaces/IgenericResponse';
import ApiError from '../../../Errors/ApiErrors';
import status from 'http-status-codes';
import { User } from '../Users/User.model';

const getAllStudent = async (
  filters: IStudentFilters,
  paginations: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginations);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: searchTerm,
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field], value) => ({
        [field]: value,
      })),
    });
  }

  const sortConditons: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditons[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Student.find(whereConditions)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
    .sort(sortConditons)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicDepartment')
    .populate('academicSemester')
    .populate('academicFaculty');
  return result;
};
const updateSingleStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(status.BAD_REQUEST, 'Student not found');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;
  const updateStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>;
      (updateStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const gurdianKey = `gurdian ${key}` as keyof Partial<IStudent>;
      (updateStudentData as any)[gurdianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardian = `gurdian ${key}` as keyof Partial<IStudent>;
      (updateStudentData as any)[localGuardian] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findByIdAndUpdate({ id }, updateStudentData, {
    new: true,
  });
  return result;
};

const deleteSingleStudent = async (id: string): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(status.BAD_REQUEST, 'Student not Found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const student = await Student.findOneAndDelete({ id });

    if (!student) {
      throw new ApiError(404, 'Filed to deletee student');
    }
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return student;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const studentService = {
  getAllStudent,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
