import { useQuery } from '@tanstack/react-query';
import { getRoom } from './get';

export const useRoom = (id: string | number) => {
  return useQuery({
    queryKey: ['room', id],
    queryFn: () => getRoom(id),
    enabled: !!id,
  });
};
