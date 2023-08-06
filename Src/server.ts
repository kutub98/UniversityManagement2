import mongoose from 'mongoose'
import App from './App'
import config from './Config/Index'

async function Db_Connect() {
  try {
    await mongoose.connect(config.DatabaseUrl as string)
    console.log('Database Connectd Succussfull')

    App.listen(config.Port, () => {
      console.log("You're listening from Port:", config.Port)
    })
  } catch (error) {
    console.log('Filed to connect to Database', error)
  }
}

Db_Connect()
