import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import { corsOptions } from './config/cors.js';
import { env } from './config/env.js';
import { adminActivityLogger } from './middlewares/adminActivityLogger.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { xssSanitizer } from './middlewares/xssSanitizer.js';
import { apiRoutes } from './routes/index.js';

export const createApp = () => {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  }));
  app.use(cors(corsOptions));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(mongoSanitize({ replaceWith: '_' }));
  app.use(xssSanitizer);
  app.use(hpp());
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  app.use(apiLimiter);
  app.use(adminActivityLogger);

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'bd-ai-ecommerce-api' });
  });

  app.use('/api/v1', apiRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
