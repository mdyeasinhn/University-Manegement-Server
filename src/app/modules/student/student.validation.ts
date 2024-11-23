import Joi from "joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .max(20)
      .custom((value, helpers) => {
        if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
          return helpers.message(`"${value}" is not in capitalize format`);
        }
        return value;
      }, 'Capitalization validation'),
    middleName: Joi.string().trim().allow(null, ''),
    lastName: Joi.string()
      .trim()
      .required()
      .regex(/^[A-Za-z]+$/)
      .messages({
        'string.pattern.base': '{#label} must only contain alphabetic characters',
      }),
  });

  // Joi schema for validating Guardian
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccaption: Joi.string().trim().required(),
    fatherContectNo: Joi.string().trim().required(),
    motherName: Joi.string().trim().required(),
    motherOccaption: Joi.string().trim().required(),
    motherContectNo: Joi.string().trim().required(),
  });

  // Joi schema for validating LocalGuardian
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    contactNo: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
  });

  // Joi schema for validating Student
  const studentvalidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .required()
      .messages({
        'any.only': '{#value} is not a valid gender',
      }),
    dateOfBirth: Joi.string().isoDate(),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': '{#value} is not a valid email address',
      }),
    contactNo: Joi.string().trim().required(),
    emergencyContactNo: Joi.string().trim().required(),
    bloogGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .messages({
        'any.only': '{#value} is not a valid blood group',
      }),
    presentAddress: Joi.string().trim().required(),
    permanentAddres: Joi.string().trim().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().uri().allow(null, ''),
    isActive: Joi.string()
      .valid('active', 'blocked')
      .default('active'),
  });


  export default studentvalidationSchema