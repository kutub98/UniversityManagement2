import { z } from 'zod';

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Faculty Title is required',
    }),
  }),
});

const UpdateFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Faculty Title is required',
    }),
  }),
});

export const facultyValidation = {
  createFacultyZodSchema,
  UpdateFacultyZodSchema,
};
