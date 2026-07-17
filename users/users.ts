import express from 'express';

const router = express.Router();

router
  .use((req, res, next) => {
    console.log('Users Time', Date.now());
    next();
  })
  .post('/login', (req, res) => {
    res.send('Login');
  })
  .post('/register', (req, res) => {
    res.send('Register');
  });

export { router as userRouter };
