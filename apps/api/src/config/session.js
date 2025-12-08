import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from '../prisma/prisma.js';

const sessionStore = new PrismaSessionStore(prisma, {
  dbRecordIdIsSessionId: true,
  checkPeriod: 1000 * 60 * 60 * 12, // 12 hours
});

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,

  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
};

export default sessionConfig;
