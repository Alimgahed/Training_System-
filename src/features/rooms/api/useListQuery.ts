import { useQuery } from '@tanstack/react-query';
import { getRooms } from './list';

export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });
};
