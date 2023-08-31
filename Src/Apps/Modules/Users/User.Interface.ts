import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUSER = {
  users: import('mongoose').Types.ObjectId;
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
};
export type userModel = Model<IUSER, Record<string, unknown>>;
