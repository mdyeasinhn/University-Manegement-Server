import { z } from 'zod';

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name must be capitalized' },
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required' })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name must only contain alphabetic characters',
    }),
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, { message: 'Father name is required' }),
  fatherOccaption: z
    .string()
    .min(1, { message: 'Father occupation is required' }),
  fatherContectNo: z
    .string()
    .trim()
    .min(1, { message: 'Father contact number is required' }),
  motherName: z.string().trim().min(1, { message: 'Mother name is required' }),
  motherOccaption: z
    .string()
    .min(1, { message: 'Mother occupation is required' }),
  motherContectNo: z
    .string()
    .trim()
    .min(1, { message: 'Mother contact number is required' }),
});

// Local Guardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  occupation: z.string().trim().min(1, { message: 'Occupation is required' }),
  contactNo: z.string().min(1, { message: 'Contact number is required' }),
  address: z.string().trim().min(1, { message: 'Address is required' }),
});

// Student schema
const createStudentValidationSchema = z.object({
  body: z.object({

    pasword: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        message: '{VALUE} is not valid',
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({ message: 'Email is not valid' })
        .min(1, { message: 'Email is required' }),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddres: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),

    })
  }),
});

export  const studentValidations = {
  createStudentValidationSchema,
};
