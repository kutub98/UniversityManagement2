import { Schema, model } from 'mongoose';
import { AcademicDeptModel, IAcademicDept } from './department.interface';

const AcademicDeptSchema = new Schema<IAcademicDept, AcademicDeptModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
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

export const AcademicDept = model<IAcademicDept, AcademicDeptModel>(
  'AcademicDept',
  AcademicDeptSchema,
);
