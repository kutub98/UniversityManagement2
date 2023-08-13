import { User } from './User.model'

// findLastUserId
const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

// generateUserId
export const generateUserId = async () => {
  try {
    const currentId =
      (await findLastUserId()) || (0).toString().padStart(5, '0')
    const nextId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0')
    return nextId
  } catch (error) {
    console.error('Error generating user id:', error)
    return null // Handle the error appropriately
  }
}
