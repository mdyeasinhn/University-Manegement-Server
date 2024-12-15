import { Request, Response, response } from 'express';
import { studentService } from './student.service';
import Joi, { string } from 'joi'
//import studentvalidationSchema from './student.validation';
import { z } from "zod";
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {


    // creating schema validation useing joi

    const studentvalidationSchema = z.object({
      id: z.string(),
      name: z.object({
        firstName: z.string().max(20, { message: 'First name can not be more then 20 characters' })
      })
    })




    const { student: studentData } = req.body;

    //data validation useing joi
    // const { error, value } = studentvalidationSchema.validate(studentData)


    const zodParseData = studentValidationSchema.parse(studentData)


    const result = await studentService.createStudentIntoDB(zodParseData);
    // if(error){
    //   res.status(500).json({
    //     success : false,
    //     message : "something went wrong",
    //     error : error.details
    //   })
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
