import { NextFunction, Request, Response, response } from 'express';
import { studentService } from './student.service';
import { z } from 'zod';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentService.getAllStudentFromDB();
  
    sendResponse(res, {
      success : true,
      statusCode : httpStatus.OK,
      message : 'Student are retrieved successfully',
      data : result,
    })
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      success : true,
      statusCode : httpStatus.OK,
      message : 'Student is retrieved successfully',
      data : result,
    })
  } catch (error) {
    next(error);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.deleteStudentFromDB(studentId);

    sendResponse(res, {
      success : true,
      statusCode : httpStatus.OK,
      message : 'Student is deleted successfully',
      data : result,
    })
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
