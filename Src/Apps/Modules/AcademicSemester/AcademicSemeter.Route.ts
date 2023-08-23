import express from 'express';
import validateRequest from '../../Middlewares/ValiadateRequest';
import { AcademicSemseterValidation } from './AcademicSemeterValidation';
const router = express.Router();
router.post(
  '/createSemester',
  validateRequest(AcademicSemseterValidation.createAcademicSemseterZodSchema),
);

export default router;
