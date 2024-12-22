import express from 'express';
import { AcademicSmesterControllers } from './academicSemester.controller';
import validateRequest from '../../maddwares/validRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSmesterControllers.createAcademicSemester,
);

export const AcademicSecemesterRoutes = router;
