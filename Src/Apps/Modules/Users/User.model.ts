import { IUSER } from './UserInterface'
import { Model, model, Schema } from 'mongoose'

type userModel = Model<IUSER, object>
export const UserSchema = new Schema<IUSER>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const User = model<IUSER, userModel>('users', UserSchema)
