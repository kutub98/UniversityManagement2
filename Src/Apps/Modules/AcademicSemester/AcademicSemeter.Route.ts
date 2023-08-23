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

export const AcademicSemesterRouter = router;
