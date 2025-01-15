import { studentService } from './student.service';
import { z } from 'zod';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// get all student
const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student are retrieved successfully',
    data: result,
  });
});

// get single sutudent from database
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentService.getSingleStudentFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentService.deleteStudentFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  //  console.log(studentId);
  const { student } = req.body;
  const result = await studentService.updateStudentIntoDB(id, student);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is updated successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
