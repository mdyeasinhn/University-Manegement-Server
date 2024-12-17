import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserService.createStudentIntoDB(password, studentData);
    
    sendResponse(res, {
      success : true,
      statusCode : httpStatus.OK,
      message : 'Student is created successfully',
      data : result,
    })
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
