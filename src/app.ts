import express from 'express';
import type { Express } from 'express';
import type { Server } from 'http';
import type { UserController } from './users/user.controller.js';
import type { ExceptionFilter } from './errors/exception.filter.js';
import type { ILogger } from './logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { types } from './types.js';
import { json } from 'body-parser';

injectable();
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(types.ILogger) protected logger: ILogger,
		@inject(types.IUserController) protected userController: UserController,
		@inject(types.IExceptionFilter) protected exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server start on http://localhost:${this.port}`);
	}
}
