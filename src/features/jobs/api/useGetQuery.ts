import { useQuery } from '@tanstack/react-query';
import { getJob } from './get';

export const useJob = (id: string | number) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => getJob(id),
    enabled: !!id,
  });
};
