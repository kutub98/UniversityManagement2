import { SortOrder } from 'mongoose';
import ApiError from '../../../Errors/ApiErrors';
import { IGenericResponse } from '../../../Interfaces/IgenericResponse';
import { IPaginationOptions } from '../../../Interfaces/paginations';
import { paginationHelper } from '../../../helpers/paginationHelper';
import {
  AcdcSmstrTitleCodeMapper,
  academicSemesterFilterableFields,
} from './AcademicSemeterConstant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './AcademicSemeterInterface';
import { AcademicSemester } from './AcademicSemeterModel';
import status from 'http-status-codes';

// create semester
const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (AcdcSmstrTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid Title code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all semester

const getAllSemseter = async (
  filters: IAcademicSemesterFilters,
  Pagination: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(Pagination);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // const andConditions = [{
  //   $or: [
  //     {
  //       title: {
  //         $regex: searchTerm,
  //         $options: "i",
  //       },
  //     },

  //     {
  //       code: {
  //         $regex: searchTerm,
  //         $options: "i"
  //       },
  //     },
  //   ]
  // }]

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};
export const AcademicSemesterService = {
  createSemester,
  getAllSemseter,
  getSingleSemester,
};
