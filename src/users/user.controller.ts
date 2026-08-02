import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller.js';
import { HttpError } from '../errors/http-error.class.js';
import type { ILogger } from '../logger/logger.interface.js';
import type { NextFunction, Request, Response } from 'express';
import { types } from '../types.js';
import type { IUserController } from './user.controller.interface.js';
import type { UserLoginDto } from './DTO/user-login.dto.js';
import type { UserRegisterDto } from './DTO/user-register.dto.js';

injectable();
export class UserController extends BaseController implements IUserController {
	constructor(@inject(types.ILogger) protected logger: ILogger) {
		super(logger);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HttpError(401, 'Authorization error', 'Login'));
		// this.ok(res, 'Login');
	}

	register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
		this.ok(res, 'Register');
	}
}
