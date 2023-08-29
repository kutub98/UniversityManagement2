import { z } from 'zod';

const departmentValidationZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'AcademicDept title required',
    }),
    academicFaculty: z.string({
      required_error: 'academicFaculty is required',
    }),
  }),
});

export const departmentValidation = {
  departmentValidationZodSchema,
};
