import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller.js';
import { HttpError } from '../errors/http-error.class.js';
import type { ILogger } from '../logger/logger.interface.js';
import type { NextFunction, Request, Response } from 'express';
import { types } from '../types.js';
import type { IUsersController } from './types/users.controller.interface.js';
import { UserLoginDto } from './DTO/user-login.dto.js';
import { UserRegisterDto } from './DTO/user-register.dto.js';
import type { IUsersService } from './types/users.service.interface.js';
import { ValidateMiddleware } from '../common/middlewares/validate.middleware.js';
import { AuthGuard } from '../common/middlewares/auth.guard.js';

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
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const isValid = await this.usersService.validateUser(req.body);

		if (!isValid) {
			return next(new HttpError(401, 'Authorization error', 'Login'));
		}

		const jwt = await this.usersService.singJWT(req.body);

		this.ok(res, { jwt });
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

		const { email, id } = newUser;
		this.ok(res, { email, id });
	}

	async info(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		let user = null;

		if (req.user) {
			const existedUser = await this.usersService.getUser(req.user);
			if (existedUser) {
				user = {
					email: existedUser.email,
					id: existedUser.id,
				};
			}
		}

		this.ok(res, { user });
	}
}
