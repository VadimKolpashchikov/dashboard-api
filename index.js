import express from 'express';

const port = 8000;
const app = express();

// app.all('/hello', (req, res, next) => {
//   console.log('ALL');
//   next();
// });

// app.get(/.*a$/, (req, res) => {
//   res.send('Hello! a');
// });

// const cb = (req, res, next) => {
//   console.log('CB');
//   next();
// };

// app.get('/hello2', [cb, cb, cb, cb], (req, res) => {
//   res.send('Hello!');
// });

// app.get('/hello', cb, (req, res) => {
//   res.send('Hello!');
// });

app.get('/hello', (req, res) => {
  res.send('Hello!');
});

app
  .route('/user/hello')
  .get((req, res) => {
    res.send('Hello GET!');
  })
  .post((req, res) => {
    res.send('Hello POST!');
  });

app.listen(port, () => {
  console.log(`Server start on http://localhost:${port}`);
});
