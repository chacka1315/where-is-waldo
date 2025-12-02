import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import getCorsOptions from './config/cors.js';
import { NotFoundError } from './errors/CustomErrors.js';
import cors from 'cors';

const app = express();
const corsConfig = getCorsOptions();

//globals middlewares
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//routing

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
