
import express, { Application, Request, Response } from "express"
import cors from "cors"


const App: Application = express();


App.use(cors())
App.use(express.json())
App.use(express.urlencoded({extended: true}))

export default App


App.get("/", (req: Request, res: Response)=>{
  res.send("You're connected to Database successfully")
})