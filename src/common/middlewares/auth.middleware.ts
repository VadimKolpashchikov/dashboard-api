import type { Request, Response, NextFunction } from 'express';
import type { IMiddleware } from '../types/middleware.interface.js';
import jwt from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private readonly secretKey: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		const { authorization } = req.headers;

		if (authorization) {
			const token = String(authorization).split('Bearer')[1]?.trim();

			if (token) {
				jwt.verify(token, this.secretKey, (err, payload) => {
					if (err) {
						next();
					} else if (payload && typeof payload === 'object') {
						req.user = payload.email;
						next();
					}
				});
			}
		} else {
			next();
		}
	}
}
