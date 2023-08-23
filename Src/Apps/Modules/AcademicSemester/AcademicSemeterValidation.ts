import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterMonths,
  AcademicSemesterTitle,
} from './AcademicSemeterConstant';

const createAcademicSemseterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitle] as [string, ...string[]], {
      required_error: 'Academics Semester Title is required',
    }),
    year: z.number({
      required_error: 'Academics Semester year is required',
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
      required_error: 'Academics Semester Code is required',
    }),
    startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'Academic semester StartMonth is required',
    }),
    endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'Academic semester EndMonth is required',
    }),
  }),
});

export const AcademicSemseterValidation = {
  createAcademicSemseterZodSchema,
};
