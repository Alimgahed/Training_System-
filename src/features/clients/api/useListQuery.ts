import { useQuery } from '@tanstack/react-query';
import { getClients } from './list';

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });
};
