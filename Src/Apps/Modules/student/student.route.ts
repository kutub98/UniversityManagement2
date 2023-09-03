import express from 'express';
import { studentControll } from './student.controll';
import validateRequest from '../../Middlewares/ValiadateRequest';
import { StudentValidaion } from './student.validation';

const router = express.Router();
router.get('/:id', studentControll.getSingleStudent);
router.get('/', studentControll.getAllStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  studentControll.updateSingleStudent,
);
router.delete('/:id', studentControll.deleteSingleStudent);

export const studentRoutes = router;
