import express from 'express';
import { studentControll } from './student.controll';

const router = express.Router();
router.get('/:id', studentControll.getSingleStudent);
router.get('/', studentControll.getAllStudent);
router.patch('/:id', studentControll.updateSingleStudent);

export const studentRoutes = router;
