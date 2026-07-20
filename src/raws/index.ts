import express from 'express';
import type { Request, Response, NextFunction } from 'express';
// import { userRouter } from './users/users.js';

const port = 8000;
const app = express();

app.use((req, res, next) => {
  console.log('Time', Date.now());
  next();
});

app.use('/hello', (req, res, next) => {
  console.log('Time Hello', Date.now());
  next();
});

app.use('/users', (req, res, next) => {
  console.log('Time USers Global', Date.now());
  next();
});

app.get('/hello', (req, res) => {
  res.type('application/json').send('Hello!');
});

app.get('/error', (req, res) => {
  throw new Error('Error!!!');
});

app.use('/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server start on http://localhost:${port}`);
});
