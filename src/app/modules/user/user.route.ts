import express from 'express';
import validateRequest from '../../maddwares/validRequest';
import { UserControllers } from './user.controller';
import { studentValidations } from '../Student/student.validation';
import { FacultyValidation} from '../Faculty/faculty.validation';
import { AdminValidations } from '../Admin/admin.validtion';

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

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);


export const UserRoutes = router;
