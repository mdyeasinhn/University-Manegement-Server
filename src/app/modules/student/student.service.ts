import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

// Retrieve all students from the database
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object 
   
  const studentSearchableFields = ['email', "name.firstName", "presentAddress"]

  let searchTerm = "";

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  });

  // FILTERING fUNCTIONALITY:

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  excludeFields.forEach((el) => delete queryObj[el]);  // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY


  console.log({query}, {queryObj});
  
  const filterQuery =  searchQuery
    .find(query)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });



    let sort = '-createdAt'

    if (query.sort) {
      sort = query.sort as string;
    }
    const sortQuery = await filterQuery.sort(sort);


    let page = 1;
    let limit = 1;
    let skip = 0;
    if (query.limit) {
      limit = Number(query.limit)
    };

    if (query.page) {
      page = Number(query.page);
      skip = (page-1)*limit
    };

    const pagineteQuery = sortQuery.skip();

    

    const limitQuery =  sortQuery.limit(limit);

   // field lemiting
   let fields = "__v";
   if(query.fields){
    fields = (query.fields as string).split(',').join(' ');
    console.log({fields});
   }

   const fieldQuery = await limitQuery.select(fields);
  return fieldQuery;
};

// Retrieve a single student by their ID
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// update student by their ID
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdateData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Soft delete a student and their associated user account
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    // If no student is found, throw an error
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student.');
    }

    // Mark the associated user account as deleted in the `User` collection
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    // If no associated user is found, throw an error
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student.');
    }

    // Abort the transaction to roll back changes in case of an error
    await session.abortTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    // Handle any errors that occurred during the transaction
    await session.abortTransaction(); // Rollback any changes
    await session.endSession(); // End the session
    throw new Error('Failed to delete student');
  }
};

// Export the student service functions
export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
