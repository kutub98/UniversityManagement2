import { Schema, model } from 'mongoose';
import {
  IAcademicFaculty,
  IAcademicFacultyModal,
} from './AcademicFaculty.Interface';

const AcademicFacultySchema = new Schema<
  IAcademicFaculty,
  IAcademicFacultyModal
>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModal>(
  'AcademicFacult',
  AcademicFacultySchema,
);
