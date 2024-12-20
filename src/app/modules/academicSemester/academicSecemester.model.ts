import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSecemester.interface';
const months: TMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

const academicSecemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    code: {
      type: String,
      required: true,

    },
    startMonth: {
      type: String,
      enum: months
    },
    endMonth: {
      type: String,
      enum: months
    },
    
  },
  {
    timestamps: true,
  },
);

export const AcademicSecemester = model<TAcademicSemester>(
    'AcademicSemister',
    academicSecemesterSchema,
    )