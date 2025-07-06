import { HttpError } from 'http-errors';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, request, response, next) => {
  if (error instanceof HttpError) {
    response.status(error.status).json({
      status: error.status,
      message: error.name,
      data: error,
    });
  } else {
    response.status(500).json({
      status: 500,
      message: 'Something went wrong',
      data: error.message,
    });
  }
};
