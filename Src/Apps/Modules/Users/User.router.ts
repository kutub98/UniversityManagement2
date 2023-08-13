import express from 'express'
import UserController from './User.controller'
const router = express.Router()

router.post('/createUser', UserController.creatUser)
export default router
