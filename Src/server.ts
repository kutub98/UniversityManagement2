/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import mongoose from 'mongoose';
import App from './App';
import config from './Config/Index';
import { InfoLogger, ErrorLogger } from './Shared/Logger';
import { Server } from 'http';
const Port = config.Port;
process.on('uncaughtException', error => {
  ErrorLogger.error(error);
  process.exit(1);
});
let server: Server;

async function Db_Connect() {
  try {
    await mongoose.connect(config.DatabaseUrl as string);
    InfoLogger.info('Database Connectd Succussfull');

    server = App.listen(Port, () => {
      InfoLogger.info(`You're listening from Port: ${Port}`);
    });
  } catch (error) {
    ErrorLogger.error('Filed to connect to Database', error);
  }

  process.on('unhandledRejection', error => {
    console.log(
      'unhandled rejection detected, we are closing our server',
      error,
    );
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

Db_Connect();
process.on('SIGTERM', () => {
  InfoLogger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
