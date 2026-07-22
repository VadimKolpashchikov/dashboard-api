import type { LoggerService } from '../logger/logger.service.js';
import { Router, type Response } from 'express';
import type { IRouteController } from './route.interface.js';

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  protected send<T>(res: Response, code: number, message: T) {
    return res.status(201).json(message);
  }

  protected ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  protected created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IRouteController[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);

      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}
