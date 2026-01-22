import 'dotenv/config';
import express, { ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import getCorsOptions from './config/cors.js';
import { NotFoundError } from './errors/CustomErrors.js';
import cors from 'cors';
import routes from './routes/index.js';
import sessionConfig from './config/session.js';
import session from 'express-session';

const app = express();

app.set('trust proxy', 1);
const corsConfig = getCorsOptions();

//globals middlewares
app.use(cors(corsConfig));
app.use(session(sessionConfig));
// app.use(session(sessionConfig));
app.use(express.json());

app.use(
  morgan('combined', {
    skip: (req, res) => {
      return res.statusCode < 400;
    },
  }),
);

//routing
app.use('/api/round', routes.round);
app.use('/api/characters', routes.character);
app.use('/api/boards', routes.board);

app.use((req, res) => {
  const error = new NotFoundError('This page does not exist.');
  res.status(error.statusCode).json({
    msg: error.message,
  });
});

//Errors handling
const globalErrHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    msg: 'Server is broken, try later...',
  });
};
app.use(globalErrHandler);

//running the server
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log('🌎 Game server is running on PORT ', PORT);
});
