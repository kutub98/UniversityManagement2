import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../Interfaces/IgenericResponse';
import { IPaginationOptions } from '../../../Interfaces/paginations';
import { academicDepartmentSearchableFields } from './department.constant';
import { IAcademicDept, IAcademicDeptFilters } from './department.interface';
import { AcademicDept } from './department.model';
import { paginationHelper } from '../../../helpers/paginationHelper';

const createAcaDept = async (
  payload: IAcademicDept,
): Promise<IAcademicDept | null> => {
  const result = (await AcademicDept.create(payload)).populate(
    'academicFaculty',
  );
  return result;
};

const getAllDepartment = async (
  filters: IAcademicDeptFilters,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<IAcademicDept[] | null>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortConditions) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicDept.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDept.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string,
): Promise<IAcademicDept | null> => {
  const result = await AcademicDept.findById(id).populate('academicFaculty');
  return result;
};

const updateSingleDepartment = async (
  id: string,
  payload: Partial<IAcademicDept>,
): Promise<IAcademicDept | null> => {
  const result = await AcademicDept.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('academicFaculty');
  return result;
};

const deleteSingleDepartment = async (
  id: string,
): Promise<IAcademicDept | null> => {
  const result = await AcademicDept.findByIdAndDelete(id);
  return result;
};

export const DeptService = {
  createAcaDept,
  getAllDepartment,
  getSingleDepartment,
  updateSingleDepartment,
  deleteSingleDepartment,
};
