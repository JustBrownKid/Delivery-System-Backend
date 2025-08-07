import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
  error?: string,
): void => {
  const isSuccess = statusCode >= 200 && statusCode < 300;

  const response: ApiResponse<T> = {
    success: isSuccess,
    message: message,
  };

  if (isSuccess) {
    if (data !== undefined) {
      response.data = data;
    }
  } else {
    if (error) {
      response.error = error;
    }
  }

  res.status(statusCode).json(response);
};