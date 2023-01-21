import type { ErrorRequestHandler, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AccessDeniedError, NotFoundError, ValidationError } from '@/models/error';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof ValidationError) {
    console.log(`Invalid: ${error.message}`);

    res.status(StatusCodes.BAD_REQUEST);
    res.send({
      status: 'error',
      error: error.message,
    });
    return;
  }

  if (error instanceof NotFoundError) {
    console.log(`Resource not found: ${error.message}`);
    res.status(StatusCodes.NOT_FOUND);
    res.send({
      status: 'error',
      error: error.message,
    });
    return;
  }

  if (error instanceof AccessDeniedError) {
    console.log(`Access denied: ${error.message}`);

    res.status(StatusCodes.FORBIDDEN);
    res.send({
      status: 'error',
      error: error.message,
    });
    return;
  }

  console.error(`Unhandled exception: ${error}, path: ${req.path}`);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  res.send({
    status: 'error',
    error: 'internal server error',
  });
};

export const notFoundErrorHandler: RequestHandler = (req, res, next) => {
  if (res.headersSent) {
    next();
    return;
  }

  console.error(`Route not found: ${req.path}`);

  res.status(StatusCodes.NOT_FOUND);
  res.send({
    status: 'error',
    error: `Route not found: ${req.path}`,
  });
};
