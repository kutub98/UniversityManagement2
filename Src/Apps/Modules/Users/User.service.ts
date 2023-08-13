import { User } from './User.model'
import { IUSER } from './UserInterface'
import config from '../../../Config/Index'
import { generateUserId } from './User.Utils'

const createUser = async (users: IUSER): Promise<IUSER | null> => {
  const id = await generateUserId()
  users.id = id as string

  // setup default password
  // if (!users.password) {
  users.password = config.StudentPassword as string
  // }
  const createdUsers = await User.create(users)

  if (!createdUsers) {
    throw new Error('Filed to create User')
  }

  return createdUsers
}

export default {
  createUser,
}
