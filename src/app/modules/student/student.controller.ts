import { Request, Response, response } from 'express';
import { studentService } from './student.service';
import Joi, { string } from 'joi'
import studentvalidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {

    // creating schema validation useing joi 
   const {student : studentData} = req.body;

   //data validation useing joi
    const { error, value } = studentvalidationSchema.validate(studentData)


    const result = await studentService.createStudentIntoDB(value);
    if(error){
      res.status(500).json({
        success : false,
        message : "something went wrong",
        error : error.details
      })
    }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
