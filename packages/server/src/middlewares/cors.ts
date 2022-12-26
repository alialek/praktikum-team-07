import type { RequestHandler } from 'express';
import corsMiddleware from 'cors';
import { cfg } from '@/cfg';

const options = {
  ...cfg.cors,
};

const { allowedOrigins } = options;

if (allowedOrigins) {
  options.origin = (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  };
}

export const cors: RequestHandler = corsMiddleware(options);
