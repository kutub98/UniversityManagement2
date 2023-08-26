import { SortOrder } from 'mongoose';

export type IGenericResponse<T> = {
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    skip?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
  };
  data?: T | null;
};
