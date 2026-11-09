import { useQuery } from '@tanstack/react-query';
import { getWorkGroup } from './get';

export const useWorkGroup = (id: string | number) => {
  return useQuery({
    queryKey: ['work-group', id],
    queryFn: () => getWorkGroup(id),
    enabled: !!id,
  });
};
