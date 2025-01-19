import express from 'express';
import validateRequest from '../../maddwares/validRequest';
import { UserControllers } from './user.controller';
import { studentValidations } from '../Student/student.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);


export const UserRoutes = router;
