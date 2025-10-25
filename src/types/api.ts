type ApiResponse<T> = {
  data: T;
  statusCode: number;
  message: string;
  timestamp: string;
  meta?: Record<string, any>;
};

type ApiError = {
  message: string | string[];
  error: string;
  statusCode: number;
};
