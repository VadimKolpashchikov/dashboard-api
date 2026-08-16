import express from 'express';
import type { Express } from 'express';
import type { Server } from 'http';
import type { UsersController } from './users/users.controller.js';
import type { ILogger } from './logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { types } from './types.js';
import type { IExceptionFilter } from './errors/exception.filter.interface.js';
import type { IConfigService } from './config/types/config.service.interface.js';
import type { PrismaService } from './database/prisma.service.js';
import { AuthMiddleware } from './common/middlewares/auth.middleware.js';

injectable();
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(types.ILogger) protected logger: ILogger,
		@inject(types.IUsersController) protected userController: UsersController,
		@inject(types.IExceptionFilter) protected exceptionFilter: IExceptionFilter,
		@inject(types.IConfigService) protected configService: IConfigService,
		@inject(types.IPrismaService) protected prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		const secretKey = this.configService.get('SECRET');
		const authMiddleware = new AuthMiddleware(secretKey as string);

		this.app.use(express.json()).use(authMiddleware.execute.bind(authMiddleware));
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

		await this.prismaService.connect();

		this.server = this.app.listen(this.port);
		this.logger.log(`Server start on http://localhost:${this.port}`);
	}
}
