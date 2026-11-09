import { useQuery } from '@tanstack/react-query';
import { getClient } from './get';

export const useClient = (id: string | number) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
    enabled: !!id,
  });
};
