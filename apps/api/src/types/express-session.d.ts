import 'express-session';

declare module 'express-session' {
  interface SessionData {
    finished: boolean;
    roundStartedAt: int;
    charsFoundIds: number[];
    charsRemainedIds: number[];
    score: number;
  }
}

export {};
