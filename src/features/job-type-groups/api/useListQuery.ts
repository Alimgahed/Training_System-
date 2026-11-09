import { useQuery } from '@tanstack/react-query';
import { getJobTypeGroups } from './list';

export const useJobTypeGroups = () => {
  return useQuery({
    queryKey: ['job-type-groups'],
    queryFn: getJobTypeGroups,
  });
};
