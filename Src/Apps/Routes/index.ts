import express from 'express';
import UserRouter from '../Modules/Users/User.router';
import { AcademicSemesterRouter } from '../Modules/AcademicSemester/AcademicSemeter.Route';
import { FacultyRouter } from '../Modules/AcademicFaculty/AcademicFaculty.Route';
const Routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/AcademicSemester',
    route: AcademicSemesterRouter,
  },
  {
    path: '/faculty',
    route: FacultyRouter,
  },
];
moduleRoutes.forEach(router => Routes.use(router.path, router.route));

export default Routes;
