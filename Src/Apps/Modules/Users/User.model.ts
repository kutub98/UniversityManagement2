import { IUSER, userModel } from './User.Interface';
import { model, Schema } from 'mongoose';

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
);

export const User = model<IUSER, userModel>('users', UserSchema);
