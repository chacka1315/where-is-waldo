import { useEffect } from 'react';

const Title = function ({ children }) {
  useEffect(() => {
    document.title = `${children} | Where is Waldo?`;
  }, [children]);

  return null;
};

export default Title;
