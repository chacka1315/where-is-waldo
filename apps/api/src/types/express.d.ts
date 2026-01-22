import * as express from 'express';
declare global {
  namespace Express {
    interface Request {
      boardId: number;
      session: {
        finished: boolean;
      };
    }
  }
}
