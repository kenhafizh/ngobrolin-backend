import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from '../utils/logger';

export function createExpressApp(): express.Application {
  const app = express();

  app.use(helmet());

  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true,
  }));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });

  return app;
}
