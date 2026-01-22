import { useEffect, type ReactNode } from 'react';

const Title = function ({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.title = `${children} | Where's Waldo?`;
  }, [children]);

  return null;
};

export default Title;
