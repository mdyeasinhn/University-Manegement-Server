import express from 'express';
import validateRequest from '../../maddwares/validRequest';
import { UserControllers } from './user.controller';
import { studentValidations } from '../Student/student.validation';
import { FacultyValidation} from '../Faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  UserControllers.createFaculty,
);


export const UserRoutes = router;
