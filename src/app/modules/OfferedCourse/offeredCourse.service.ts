import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { SemesterRegistration } from "../SemesterRegistration/semesterRegistration.model";
import { AcademicFaculty } from "../AcademicFaculty/academicFaculty.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { AcademicDepartment } from "../AcademicDepartment/academicDepartment.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  // Check if the semester registration exists
  const isSemesterRegistrationExits = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (!isSemesterRegistrationExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester Registration not found !");
  }

  const academicSemester = isSemesterRegistrationExits.academicSemester;

  // Check if the academic faculty exists
  const isAcademicFacultyExits = await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found !");
  }

  // Check if the academic department exists
  const isAcademicDepartmentExits = await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found !");
  }

  // Check if the course exists
  const isCourseExits = await Course.findById(course);

  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found !");
  }

  // Check if the faculty exists
  const isFacultyExits = await Faculty.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !");
  }

  // Check if the department belongs to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExits.name} is not belong to this ${isAcademicFacultyExits.name}`
    );
  }

  // Check if the same offered course with the same section in the same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`
    );
  }

  // get the schedules of the faculties
 


//  Create the offered course
  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  });

  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};