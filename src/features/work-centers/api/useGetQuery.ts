import { useQuery } from '@tanstack/react-query';
import { getWorkCenter } from './get';

export const useWorkCenter = (id: string | number) => {
  return useQuery({
    queryKey: ['work-center', id],
    queryFn: () => getWorkCenter(id),
    enabled: !!id,
  });
};
