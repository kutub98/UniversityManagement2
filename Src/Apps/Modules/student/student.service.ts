import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../../../Interfaces/paginations';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { IGenericResponse } from '../../../Interfaces/IgenericResponse';

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

export const studentService = {
  getAllStudent,
};
