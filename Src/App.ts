import express, { Application } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './Errors/GlobalErrorHandler';
import Routes from './Apps/Routes';

const App: Application = express();

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.use('/api/v1/', Routes);

export default App;

// App.get('/',() => {

//   // throw new ApiError( 400)

// })

App.use(GlobalErrorHandler);
