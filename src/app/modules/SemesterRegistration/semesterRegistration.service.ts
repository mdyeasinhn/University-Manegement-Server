/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { RegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { SemesterRegistration  } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */
  const academicSemester = payload?.academicSemester;

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration .findOne({
      $or: [{ status: RegistrationStatus.UPCOMING }, { status:RegistrationStatus.ONGOING }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester?.status} registered semester !`,
    );
  }

  // check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found !',
    );
  }

  // check if the semester is allready registered !

  const isAcademicRegistrationExists = await SemesterRegistration .findOne({
    academicSemester,
  });
  if (isAcademicRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This  semester is already registered !',
    );
  }

  const result = await SemesterRegistration .create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration .find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration .findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExists = await SemesterRegistration .findById(id);
  console.log(isSemesterRegistrationExists)
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This  semester is already registered !',
    );
  }
  // if there are requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status

  if (currentSemesterStatus === RegistrationStatus.ENDED  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This  semester is already ${currentSemesterStatus}`,
    );
  }
  if(currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED){
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  if(currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING){
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  };

  const result = await SemesterRegistration .findByIdAndUpdate(id, payload, {
    new : true,
    runValidators : true,
  })
  return result;
};


//const deleteSemesterRegistrationFromDB = async (id: string) => {};
export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  //deleteSemesterRegistrationFromDB,
};
