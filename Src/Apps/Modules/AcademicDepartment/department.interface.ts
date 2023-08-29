import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../AcademicFaculty/AcademicFaculty.Interface';

export type IAcademicDept = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type AcademicDeptModel = Model<IAcademicDept, Record<string, unknown>>;
export type IAcademicDeptFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
