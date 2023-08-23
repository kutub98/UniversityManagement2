import { Model } from 'mongoose';
export type IacademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IacademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type IacademicSemesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: IacademicSemesterTitle;
  year: number;
  code: IacademicSemesterCode;
  startMonth: IacademicSemesterMonths;
  endMonth: IacademicSemesterMonths;
};

export type AcademicSemesterModal = Model<IAcademicSemester>;
