import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import getCorsOptions from './config/cors.js';
import { NotFoundError } from './errors/CustomErrors.js';
import cors from 'cors';
import sessionConfig from './config/session.js';
import routes from './routes/index.js';

const app = express();
app.set('trust proxy', 1);

const corsConfig = getCorsOptions();

//globals middlewares
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(express.json());
morgan('combined', {
  skip: (req, res) => {
    return res.statusCode < 400;
  },
});

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
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    msg: 'Server is broken, try later...',
  });
});

//running the server
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log('🌎 Game server is running on PORT ', PORT);
});
