import type { Request, Response, NextFunction } from 'express';
import type { IMiddleware } from '../types/middleware.interface.js';
import { HttpError } from '../../errors/http-error.class.js';

export class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (!req.user) {
			next(new HttpError(401, 'Unauthorized', 'Auth Guard'));
		} else {
			next();
		}
	}
}
