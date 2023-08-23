import express, { Application } from 'express';
import cors from 'cors';
import userRouter from './Apps/Modules/Users/User.router';
import GlobalErrorHandler from './Errors/GlobalErrorHandler';
import { AcademicSemesterRouter } from './Apps/Modules/AcademicSemester/AcademicSemeter.Route';
// import ApiError from './Errors/ApiErrors'

const App: Application = express();

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.use('/api/v1/users', userRouter);
App.use('/api/v1/AcademicSemester', AcademicSemesterRouter);

export default App;

// App.get('/',() => {

//   // throw new ApiError( 400)

// })

App.use(GlobalErrorHandler);
