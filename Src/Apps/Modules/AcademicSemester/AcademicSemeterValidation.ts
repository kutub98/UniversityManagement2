import { z } from 'zod';

const createAcademicSemseterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Academics Semester Title is required',
    }),
    year: z.number({
      required_error: 'Academics Semester year is required',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Academics Semester Code is required',
    }),
    startMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'Academic semester StartMonth is required',
      },
    ),
    endMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'Academic semester EndMonth is required',
      },
    ),
  }),
});

export const AcademicSemseterValidation = {
  createAcademicSemseterZodSchema,
};
