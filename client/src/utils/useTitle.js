import { useEffect } from 'react';

export const useTitle = (title) => {
  useEffect(() => {
    title && (document.title = `${title} / Twitter`);

    return () => document.title = 'Twitter'
  }, [title]);
};
