export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ApiResponse<T> = {
  data: T;
  statusCode: number;
  message: string;
  timestamp: string;
  meta?: PaginationMeta;
};

export type ApiError = {
  message: string | string[];
  error: string;
  statusCode: number;
};
