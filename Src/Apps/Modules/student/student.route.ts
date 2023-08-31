import express from 'express';
import { studentControll } from './student.controll';

const router = express.Router();

router.post('/', studentControll.getAllStudent);

export const studentRoutes = router;
