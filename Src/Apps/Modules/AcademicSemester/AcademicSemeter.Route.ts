import express from 'express';
import validateRequest from '../../Middlewares/ValiadateRequest';
import { AcademicSemseterValidation } from './AcademicSemeterValidation';
import { AcademicSemesterController } from './AcademicSemsterController';
const router = express.Router();

// route
router.post(
  '/createSemester',
  validateRequest(AcademicSemseterValidation.createAcademicSemseterZodSchema),
  AcademicSemesterController.createSemesters,
);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.patch(
  '/:id',
  validateRequest(AcademicSemseterValidation.UpdateAcademicSemseterZodSchema),
  AcademicSemesterController.updateSingleSemester,
);
router.get('/', AcademicSemesterController.getAllSemester);

export const AcademicSemesterRouter = router;
