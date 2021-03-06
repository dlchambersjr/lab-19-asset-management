// Load Express Framework
import express from 'express';

// Load local middleware
import userRouter from './api/user-router.js';
import authRouter from './middleware/auth.js';
import uploadRouter from './api/upload-router.js';


import notFound from './middleware/404.js';
import error from './middleware/error.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Process incoming through the routers
app.use(userRouter);
app.use(uploadRouter);

//use local middleware
app.use(notFound);
app.use(authRouter);
app.use(error);

let server;

module.exports = {
  app,
  start: (port) => {
    server = app.listen(port, () => console.log(`LAB-19 SERVER Listening on PORT: ${port}`));
  },
  stop: () => {
    server.close(() => {
      console.log('Server has been stopped');
    });
  },
};