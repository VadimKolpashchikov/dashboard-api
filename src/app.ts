import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js';
import type { Server } from 'http';

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use('/users', userRouter);
  }

  async init(): Promise<void> {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log(`Server start on http://localhost:${this.port}`);
  }
}
