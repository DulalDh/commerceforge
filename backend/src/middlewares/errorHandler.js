import { env } from '../config/env.js';

export const errorHandler = (error, _req, res, _next) => {
  const normalizedError = normalizeError(error);
  const statusCode = normalizedError.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500 && env.NODE_ENV === 'production'
        ? 'Internal server error'
        : normalizedError.message,
    ...(envSafeDetails(normalizedError, statusCode))
  });
};

const normalizeError = (error) => {
  if (error.name === 'ValidationError') {
    return {
      statusCode: 400,
      message: 'Validation failed',
      details: Object.fromEntries(
        Object.entries(error.errors || {}).map(([key, value]) => [key, value.message])
      )
    };
  }

  if (error.code === 11000) {
    return {
      statusCode: 409,
      message: 'Duplicate value already exists',
      details: error.keyValue
    };
  }

  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    return {
      statusCode: 401,
      message: 'Invalid or expired authentication token'
    };
  }

  return error;
};

const envSafeDetails = (error, statusCode) => {
  if ((statusCode >= 500 && env.NODE_ENV === 'production') || !error.details) {
    return {};
  }

  return { details: error.details };
};
