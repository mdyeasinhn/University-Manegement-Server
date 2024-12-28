import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Academic facualty must be string.',
    }),
});

export const userValidation = {
  userValidationSchema: academicFacultyValidationSchema,
};
