import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller.js';
import { HttpError } from '../errors/http-error.class.js';
import type { ILogger } from '../logger/logger.interface.js';
import type { NextFunction, Request, Response } from 'express';
import { types } from '../types.js';
import type { IUsersController } from './types/users.controller.interface.js';
import type { UserLoginDto } from './DTO/user-login.dto.js';
import type { UserRegisterDto } from './DTO/user-register.dto.js';
import type { IUsersService } from './types/users.service.interface.js';

injectable();
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(types.ILogger) private loggerService: ILogger,
		@inject(types.IUsersService) protected usersService: IUsersService,
	) {
		super(loggerService);
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

	async register(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = await this.usersService.createUser(req.body);
		if (!newUser) {
			return next(new HttpError(422, 'This user already exists'));
		}
		this.ok(res, newUser);
	}
}
