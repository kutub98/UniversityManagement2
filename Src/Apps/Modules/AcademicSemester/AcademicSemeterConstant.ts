import {
  IacademicSemesterCode,
  IacademicSemesterMonths,
  IacademicSemesterTitle,
} from './AcademicSemeterInterface';

export const AcademicSemesterTitle: IacademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcdcSmstrTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const AcademicSemesterCode: IacademicSemesterCode[] = ['01', '02', '03'];

export const AcademicSemesterMonths: IacademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
