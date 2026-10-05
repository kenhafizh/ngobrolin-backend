import { Request, Response, NextFunction } from 'express';
import { error } from '../utils/respons';
import { logger } from '../utils/logger';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  logger.error('Unhandled error', { message: err.message, stack: err.stack });
  res.status(500).json(error('Internal server error'));
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json(error('Endpoint tidak ditemukan'));
}
