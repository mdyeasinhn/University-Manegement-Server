/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { RegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { SemesterRegestration } from './semesterRegistration.model';


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

  // check if the semester is exist
  const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {

    throw new AppError(httpStatus.NOT_FOUND, "This academic semester not found !")
  };

  // check if the semester is allready registered !

  const isAcademicRegistrationExists = await SemesterRegestration.findOne({ academicSemester });
  if (isAcademicRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, "This  semester is allready registered !")

  }

  const result = await SemesterRegestration.create(payload);
  return result
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {

};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {

};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {


};

const deleteSemesterRegistrationFromDB = async (id: string) => {
}
export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};