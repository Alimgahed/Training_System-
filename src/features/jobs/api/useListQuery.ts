import { useQuery } from '@tanstack/react-query';
import { getJobs } from './list';

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  });
};
