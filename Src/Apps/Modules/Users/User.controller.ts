import { Request, Response } from 'express'
import UserService from './User.service'

const creatUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'Create user successfully',
      data: result,
    })
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Failed to Create user',
    })
  }
}
export default {
  creatUser,
}
