import { corsOrigins, env } from './env.js';

export const corsOptions = {
  origin(origin, callback) {
    if (!origin && env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    if (origin && corsOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
};
