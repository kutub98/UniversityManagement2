import express, { Application } from 'express'
import cors from 'cors'
import userRouter from './Apps/Modules/Users/User.router'
import GlobalErrorHandler from './Errors/GlobalErrorHandler'

const App: Application = express()

App.use(cors())
App.use(express.json())
App.use(express.urlencoded({ extended: true }))

App.use('/api/v1/users', userRouter)

export default App

// App.get('/',  (req: Request, res: Response, next: NextFunction) => {

//   throw new Error( "Testing ERROR LOGGER")

// })

App.use(GlobalErrorHandler)
