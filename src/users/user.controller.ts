import { BaseController } from '../common/base.controller.js';
import { HttpError } from '../errors/http-error.class.js';
import type { ILogger } from '../logger/logger.interface.js';
import type { NextFunction, Request, Response } from 'express';

export class UserController extends BaseController {
  constructor(logger: ILogger) {
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

  login(req: Request, res: Response, next: NextFunction) {
    next(new HttpError(401, 'Authorization error', 'Login'));
    // this.ok(res, 'Login');
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'Register');
  }
}
