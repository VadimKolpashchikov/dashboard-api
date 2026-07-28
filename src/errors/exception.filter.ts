import type { NextFunction, Request, Response } from 'express';
import type { IExceptionFilter } from './exception.filter.interface.js';
import { HttpError } from './http-error.class.js';
import type { ILogger } from '../logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { types } from '../types.js';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(types.ILogger) protected logger: ILogger) {}
	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
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
