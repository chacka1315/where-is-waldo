import { CorsOptions } from 'cors';
const getCorsOptions = (): CorsOptions => {
  //prod
  if (process.env.NODE_ENV === 'production') {
    return {
      origin: process.env.GAME_PAGE_URL,
      credentials: true,
    };
  }

  //dev
  return {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        origin.startsWith('http://localhost') ||
        origin.startsWith('http://127.0.0.1')
      ) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS.'), false);
    },
    credentials: true,
  };
};

export default getCorsOptions;
