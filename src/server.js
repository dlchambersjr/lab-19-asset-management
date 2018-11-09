// Load express framework
import express from 'express';

//Load cors becaes we are going to be accessing the server from a spereate client
import cors from 'cors';

// Load the different inhouse middleware pieces
//1. Authentication
import authRouter from './auth/router.js';

// 2. Where to go after authenticated
import uploadRouter from './routes/upload.js';

// 3. What to do if the route is not found.
import notFound from './middleware/404.js';

// 4. What to do if there is an error
import error from './middleware/error.js';

// create a shortcut name for express()
const app = express();

// Activate express modules
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tell express to follow the following "steps"
app.use(authRouter);
app.use(uploadRouter);
app.use(notFound);
app.use(error);


let server = false;

module.exports = {
  app,
  start: (port) => {
    if (!server) {
      server = app.listen(port, (err) => {
        if (err) { throw err; }
        console.log('LAB-19 SERVER Listening on PORT: ', port);
      });
    } else {
      console.log('server is already running');
    }
  },
  stop: () => {
    server.close(() => {
      console.log('Server has been stopped');
    });
  },
};