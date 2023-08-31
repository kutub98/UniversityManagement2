import express from 'express';
import UserController from './User.controller';
import validateRequest from '../../Middlewares/ValiadateRequest';
import { UserValidation } from './User.Validation';
const router = express.Router();

router.post(
  '/createStudent',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent,
);
export default router;
