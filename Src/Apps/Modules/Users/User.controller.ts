import { RequestHandler } from 'express';
import UserService from './User.service';

const creatUser: RequestHandler = async (req, res, next) => {
  try {
    const { users } = req.body;
    const result = await UserService.createUser(users);
    res.status(200).json({
      success: true,
      message: 'Create user successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  creatUser,
};
