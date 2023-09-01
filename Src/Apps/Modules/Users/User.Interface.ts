import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../Faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUSER = {
  users: import('mongoose').Types.ObjectId;
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};
export type userModel = Model<IUSER, Record<string, unknown>>;
