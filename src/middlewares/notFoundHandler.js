import createHttpError from 'http-errors';

export const notFoundHandler = (request, response, next) => {
  next(createHttpError(404, 'Route not found'));
};
