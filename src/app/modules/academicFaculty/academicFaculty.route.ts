import express from 'express';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../maddwares/validRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.get('/:departmentId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);



export const AcademicFacultyRoutes = router;