import express from 'express';
import UserController from './User.controller';
import validateRequest from '../../Middlewares/ValiadateRequest';
import { UserValidation } from './User.Validation';
const router = express.Router();

router.post(
  '/createUser',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.creatUser,
);
export default router;
