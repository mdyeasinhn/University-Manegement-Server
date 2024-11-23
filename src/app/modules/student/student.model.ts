  import { Schema, model } from 'mongoose';
  import validator from 'validator';


  import {
    Guardian,
    LocalGuardian,
    Student,
    UserName,
  } from './student.interface';

  const userNameSchema = new Schema<UserName>({
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [20, "First name can not be more then 20 characters"],
      validate: {
        validator: function (value: String) {
          const firstNameValue = value.charAt(0).toUpperCase() + value.slice(1);
          return firstNameValue === value
        },
        message : '{VALUE} is not capitalize format '
      }
    },
    middleName: {
      type: String,
      trim: true,

    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      validate :{
        validator : (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not validate'
      }
    },
  });

  const guardianSchema = new Schema<Guardian>({
    fatherName: {
      type: String,
      required: [true, "Father name is required"],
      trim: true,

    },
    fatherOccaption: {
      type: String,
      required: true,
    },
    fatherContectNo: {
      type: String,
      required: true,
      trim: true,

    },
    motherName: {
      type: String,
      required: [true, "Mother name is required"],
      trim: true,

    },
    motherOccaption: {
      type: String,
      required: true,
      trim: true,

    },
    motherContectNo: {
      type: String,
      required: true,
      trim: true,

    },
  });

  const localGuradianSchema = new Schema<LocalGuardian>({
    name: {
      type: String,
      required: true,
      trim: true,

    },
    occupation: {
      type: String,
      required: true,
      trim: true,

    },
    contactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,

    },
  });

  const studentSchema = new Schema<Student>({
    id: { type: String, required: true, unique: true },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid'
      },
      required: true

    },
    dateOfBirth: { type: String },
    email: {
      type: String,
        required: true,
        unique: true ,
        validate :{
          validator : (value : string) => validator.isEmail(value),
          message: "{VALUE} in not a valid email type "
        }

        },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloogGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddres: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true
    },
    localGuardian: {
      type: localGuradianSchema,
      required: true
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: "active"


    },
  });

  export const StudentModel = model<Student>('Student', studentSchema);
