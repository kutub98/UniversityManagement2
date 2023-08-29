import { model, Schema } from 'mongoose';
import status from 'http-status-codes';
import {
  AcademicSemesterModal,
  IAcademicSemester,
} from './AcademicSemeterInterface';
import {
  AcademicSemesterCode,
  AcademicSemesterMonths,
  AcademicSemesterTitle,
} from './AcademicSemeterConstant';
import ApiError from '../../../Errors/ApiErrors';

export const IAcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterTitle,
    },
    year: {
      type: String,
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

IAcademicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester is already exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModal>(
  'Semesters',
  IAcademicSemesterSchema,
);
