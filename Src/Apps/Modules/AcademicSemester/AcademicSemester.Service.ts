import { SortOrder } from 'mongoose';
import ApiError from '../../../Errors/ApiErrors';
import { IGenericResponse } from '../../../Interfaces/IgenericResponse';
import { IPaginationOptions } from '../../../Interfaces/paginations';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { AcdcSmstrTitleCodeMapper } from './AcademicSemeterConstant';
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
  const { searchTerm } = filters;
  const andConditions = [];
  const AcademicSemesterSearchableFiled = ['title', 'year', 'code'];
  if (searchTerm) {
    andConditions.push({
      $or: AcademicSemesterSearchableFiled.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: 'i',
        },
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

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(Pagination);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await AcademicSemester.find({ $and: andConditions })
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
export const AcademicSemesterService = {
  createSemester,
  getAllSemseter,
};
