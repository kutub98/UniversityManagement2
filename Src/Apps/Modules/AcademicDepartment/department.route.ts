import express from 'express';
import { deptController } from './department.controller';
import validateRequest from '../../Middlewares/ValiadateRequest';
import { departmentValidation } from './department.validation';

const router = express.Router();

router.post(
  '/createDept',
  validateRequest(departmentValidation.departmentValidationZodSchema),
  deptController.createDept,
);
router.get('/', deptController.getAllDepartment);

export const academicDepartmentRouter = router;
