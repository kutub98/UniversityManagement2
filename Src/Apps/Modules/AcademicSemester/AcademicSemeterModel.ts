import { model, Schema } from 'mongoose';
import {
  AcademicSemesterModal,
  IAcademicSemester,
} from './AcademicSemeterInterface';
import {
  AcademicSemesterCode,
  AcademicSemesterMonths,
  AcademicSemesterTitle,
} from './AcademicSemeterConstant';

export const IAcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonths,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModal>(
  'Semesters',
  IAcademicSemesterSchema,
);
