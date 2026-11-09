import { useQuery } from '@tanstack/react-query';
import { getJobTypeGroup } from './get';

export const useJobTypeGroup = (id: string | number) => {
  return useQuery({
    queryKey: ['job-type-group', id],
    queryFn: () => getJobTypeGroup(id),
    enabled: !!id,
  });
};
