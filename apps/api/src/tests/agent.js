import express from 'express';
import request from 'supertest';
import 'dotenv/config';
import { NotFoundError } from '../errors/CustomErrors.js';
import routes from '../routes/index.js';

function createAgent(sessionData) {
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => {
    req.session = { ...sessionData };
    next();
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

  return request.agent(app);
}

export default createAgent;
