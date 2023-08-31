import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './Errors/GlobalErrorHandler';
import Routes from './Apps/Routes';
import status from 'http-status-codes';
const App: Application = express();

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.use('/api/v1/', Routes);

export default App;

App.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.BAD_REQUEST).json({
    success: false,
    message: 'Not Found',
    errorMessages: {
      path: req.originalUrl,
      message: 'Api Not found',
    },
  });
  next();
});

App.use(GlobalErrorHandler);
