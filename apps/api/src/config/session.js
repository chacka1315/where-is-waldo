import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from '../prisma/prisma.js';

const sessionStore = new PrismaSessionStore(prisma, {
  dbRecordIdIsSessionId: true,
  checkPeriod: 1000 * 60 * 60, // 1 hour
});

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,

  cookie: {
    maxAge: 1000 * 60 * 60 * 5, // 5 hours
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
};

export default sessionConfig;
