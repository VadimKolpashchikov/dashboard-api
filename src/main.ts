import { Container, ContainerModule, type Bind } from 'inversify';
import { App } from './app.js';
import { ExceptionFilter } from './errors/exception.filter.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/user.controller.js';
import type { ILogger } from './logger/logger.interface.js';
import { types } from './types.js';
import type { IExceptionFilter } from './errors/exception.filter.interface.js';
import type { IUserController } from './users/user.controller.interface.js';

interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((options) => {
	options.bind<ILogger>(types.ILogger).to(LoggerService);
	options.bind<IExceptionFilter>(types.IExceptionFilter).to(ExceptionFilter);
	options.bind<IUserController>(types.IUserController).to(UserController);
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
