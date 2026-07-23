import express from 'express';
import type { Express } from 'express';
import type { Server } from 'http';
import type { UserController } from './users/user.controller.js';
import type { ExceptionFilter } from './errors/exception.filter.js';
import type { ILogger } from './logger/logger.interface.js';

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    protected logger: ILogger,
    protected userController: UserController,
    protected exceptionFilter: ExceptionFilter,
  ) {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use('/users', this.userController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  async init(): Promise<void> {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server start on http://localhost:${this.port}`);
  }
}
