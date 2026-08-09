import type { Request, Response, NextFunction } from 'express';
import type { IMiddleware } from '../types/middleware.interface.js';
import { type ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		const instance = plainToInstance(this.classToValidate, req.body);
		const errors = await validate(instance);

		if (errors.length) {
			res.status(422).send(errors);
		} else {
			next();
		}
	}
}
