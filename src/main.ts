import { Container, ContainerModule } from 'inversify';
import { App } from './app.js';
import { ExceptionFilter } from './errors/exception.filter.js';
import { LoggerService } from './logger/logger.service.js';
import { UsersController } from './users/users.controller.js';
import type { ILogger } from './logger/logger.interface.js';
import { types } from './types.js';
import type { IExceptionFilter } from './errors/exception.filter.interface.js';
import type { IUsersController } from './users/types/users.controller.interface.js';
import type { IUsersService } from './users/types/users.service.interface.js';
import { UsersService } from './users/servicies/users.service.js';
import type { IConfigService } from './config/types/config.service.interface.js';
import { ConfigService } from './config/config.service.js';
import { PrismaService } from './database/prisma.service.js';
import { UsersRepository } from './users/repositories/users.repository.js';
import type { IUsersRepository } from './users/types/users.repository.interface.js';

interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((options) => {
	options.bind<ILogger>(types.ILogger).to(LoggerService).inSingletonScope();
	options.bind<IExceptionFilter>(types.IExceptionFilter).to(ExceptionFilter);
	options.bind<IUsersController>(types.IUsersController).to(UsersController);
	options.bind<IUsersService>(types.IUsersService).to(UsersService);
	options.bind<IConfigService>(types.IConfigService).to(ConfigService).inSingletonScope();
	options.bind<PrismaService>(types.IPrismaService).to(PrismaService).inSingletonScope();
	options.bind<IUsersRepository>(types.IUsersRepository).to(UsersRepository).inSingletonScope();
	options.bind<App>(types.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(types.Application);
	await app.init();

	return { app, appContainer };
}

export const { app, appContainer } = await bootstrap();
