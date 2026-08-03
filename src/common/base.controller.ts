import { Router, type Response } from 'express';
import type { ExpressReturnType, IRouteController } from './route.interface.js';
import type { ILogger } from '../logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { types } from '../types.js';

injectable();
export abstract class BaseController {
	private readonly _router: Router;

	constructor(@inject(types.ILogger) private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	protected send<T>(res: Response, code: number, message: T): ExpressReturnType {
		return res.status(201).json(message);
	}

	protected ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	protected created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IRouteController[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);

			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
