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
    year: z.string({
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

const UpdateAcademicSemseterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterTitle] as [string, ...string[]], {
          required_error: 'Academics Semester Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Academics Semester year is required',
        })
        .optional(),
      code: z
        .enum([...AcademicSemesterCode] as [string, ...string[]], {
          required_error: 'Academics Semester Code is required',
        })
        .optional(),
      startMonth: z
        .enum([...AcademicSemesterMonths] as [string, ...string[]], {
          required_error: 'Academic semester StartMonth is required',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicSemesterMonths] as [string, ...string[]], {
          required_error: 'Academic semester EndMonth is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both Title and Code should be provided, or neither.',
    },
  );

export const AcademicSemseterValidation = {
  createAcademicSemseterZodSchema,
  UpdateAcademicSemseterZodSchema,
};
