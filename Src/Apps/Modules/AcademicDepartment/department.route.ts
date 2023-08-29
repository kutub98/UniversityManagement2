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
router.get('/:id', deptController.getSingleDepartment);
router.patch(
  '/:id',
  validateRequest(departmentValidation.departmentUpdateValidationZodSchema),
  deptController.updateSingleDepartment,
);

router.delete('/:id', deptController.deleteSingleDepartment);
export const academicDepartmentRouter = router;
