import { Model } from 'mongoose'

export type IUSER = {
  id: string
  role: string
  password: string
}
export type userModel = Model<IUSER, Record<string, unknown>>
