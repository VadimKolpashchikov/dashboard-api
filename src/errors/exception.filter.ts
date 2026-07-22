import type { NextFunction, Request, Response } from 'express';
import type { LoggerService } from '../logger/logger.service.js';
import type { IExceptionFilter } from './exception.filter.interface.js';
import { HttpError } from './http-error.class.js';

export class ExceptionFilter implements IExceptionFilter {
  constructor(protected logger: LoggerService) {}
  catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof HttpError) {
      this.logger.error(
        `${err.context ? `[${err.context}] ` : ''}Error ${err.statusCode}: ${err.message}`,
      );
      res.status(err.statusCode).json({ error: err.message });
    } else {
      this.logger.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }
}
