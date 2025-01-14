import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // If password is not provided, use the default password
  userData.password = password || (config.default_password as string);

  // Set the student role
  userData.role = 'student';

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Generate a student ID manually
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );
    console.log('Generated User ID:', userData.id);

    // Create a user (transaction-1)
    const newUser = await User.create([userData], { session }); //array

    // Create a student if the user was successfully created
    if (!newUser.length) {
      // Set `id` and `user` references in the payload
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user');
    }

    payload.id = newUser[0].id; // set id , _id as user
    payload.user = newUser[0]._id; //reference _id

    // Create a new student and return the result (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create student');
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const UserService = {
  createStudentIntoDB,
};
