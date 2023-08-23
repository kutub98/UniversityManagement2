import { model, Schema } from 'mongoose';
import { AcademicSemesterModal, IAcademicSemester } from './Academic.Interface';
import { AcademicSeason, code, Months } from './AcademicSemesterConstant';

export const IAcademicSemesterSchema = new Schema<IAcademicSemester>({
  title: {
    type: String,
    required: true,
    enum: AcademicSeason,
  },
  year: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: code,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
});

export const User = model<IAcademicSemester, AcademicSemesterModal>(
  'Semesters',
  IAcademicSemesterSchema,
);
