const getCorsOptions = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      origin: process.env.GAME_PAGE_URL,
      credentials: true,
    };
  }

  return {
    origin: '*',
  };
};

export default getCorsOptions;
