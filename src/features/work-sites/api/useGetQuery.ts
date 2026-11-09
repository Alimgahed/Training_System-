import { useQuery } from '@tanstack/react-query';
import { getWorkSite } from './get';

export const useWorkSite = (id: string | number) => {
  return useQuery({
    queryKey: ['work-site', id],
    queryFn: () => getWorkSite(id),
    enabled: !!id,
  });
};
