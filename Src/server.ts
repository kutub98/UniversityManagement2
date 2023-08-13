/* eslint-disable no-console */
import mongoose from 'mongoose'
import App from './App'
import config from './Config/Index'
import { InfoLogger, ErrorLogger } from './Shared/Logger'

async function Db_Connect() {
  try {
    await mongoose.connect(config.DatabaseUrl as string)
    InfoLogger.info('Database Connectd Succussfull')

    App.listen(config.Port, () => {
      InfoLogger.info("You're listening from Port:", config.Port)
    })
  } catch (error) {
    ErrorLogger.error('Filed to connect to Database', error)
  }
}

Db_Connect()
