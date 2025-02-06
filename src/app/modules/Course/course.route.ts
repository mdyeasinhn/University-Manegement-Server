import express from 'express';

import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
import validateRequest from '../../maddwares/validateRequest';
import auth from '../../maddwares/auth';

const router = express.Router();

router.post(
  '/create-course',
  auth("admin"),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', auth("admin", "faculty", "student"), CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  auth("admin", ),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete('/:id', auth("admin") CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
