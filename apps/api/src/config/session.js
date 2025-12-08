import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from '../prisma/prisma.js';

const sessionStore = new PrismaSessionStore(prisma, {
  dbRecordIdIsSessionId: true,
  checkPeriod: 1000 * 60 * 60 * 24, // 1 day
});

const sessionConfig = {
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  secure: process.env.NODE_ENV === 'production',
  store: sessionStore,
  sameSite: 'lax',
};

export default sessionConfig;
