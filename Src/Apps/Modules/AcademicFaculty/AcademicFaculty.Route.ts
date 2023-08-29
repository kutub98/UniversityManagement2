import express from 'express';
// import validateRequest from "../../Middlewares/ValiadateRequest";
import { facultyController } from './AcademicFaculty.Controller';
import validateRequest from '../../Middlewares/ValiadateRequest';
import { facultyValidation } from './AcademicFaculty.Validation';
const router = express.Router();
router.post(
  '/createFaculty',
  validateRequest(facultyValidation.createFacultyZodSchema),
  facultyController.createFaculty,
);
router.get('/:id', facultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(facultyValidation.UpdateFacultyZodSchema),
  facultyController.updateFaculty,
);
router.get('/', facultyController.getAllFaculty);
router.delete('/:id', facultyController.deleteFaculty);

export const FacultyRouter = router;
