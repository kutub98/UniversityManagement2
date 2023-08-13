import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './Apps/Modules/Users/User.router'
// import UserService from './Apps/Modules/Users/User.service'
const App: Application = express()

App.use(cors())
App.use(express.json())
App.use(express.urlencoded({ extended: true }))

App.use('/api/v1/users', userRouter)

export default App

App.get('/', (req: Request, res: Response) => {
  // await UserService.createUser(
  //   {
  //     id: "234",
  //     password: "12345",
  //     role: "student"
  //   }
  // )
  res.send("You're connected to Database successfully")
})
