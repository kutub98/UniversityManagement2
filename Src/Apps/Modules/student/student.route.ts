import express from 'express';
import { studentControll } from './student.controll';

const router = express.Router();

router.get('/', studentControll.getAllStudent);

export const studentRoutes = router;
