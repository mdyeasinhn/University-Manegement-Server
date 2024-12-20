import express from 'express';
import validateRequest from '../../maddwares/validRequest';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';



const router = express.Router();



router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
