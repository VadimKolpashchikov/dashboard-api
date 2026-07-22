import type { NextFunction, Request, Response } from 'express';
import type { HttpError } from './http-error.class.js';

export interface IExceptionFilter {
  catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void;
}
