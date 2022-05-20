import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useContactIdFromParams = () => {
  const { search } = useLocation();

  return useMemo(() => {
    const { contactId } = (Object as any).fromEntries(
      (new URLSearchParams(search) as any).entries()
    );

    return {
      contactId,
    };
  }, [search]);
};
