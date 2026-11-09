import { useQuery } from '@tanstack/react-query';
import { getWorkGroups } from './list';

export const useWorkGroups = () => {
  return useQuery({
    queryKey: ['work-groups'],
    queryFn: getWorkGroups,
  });
};
