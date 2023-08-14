import { RequestHandler } from 'express'
import UserService from './User.service'
import { z } from 'zod'

const creatUser: RequestHandler = async (req, res, next) => {
  const createUserZodSchema = z.object({
    body: z.object({
      user: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
      }),
    }),
    password: z.string().optional(),
  })

  await createUserZodSchema.parseAsync(req)

  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'Create user successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
export default {
  creatUser,
}
