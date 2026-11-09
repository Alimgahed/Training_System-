import { useQuery } from '@tanstack/react-query';
import { getWorkSites } from './list';

export const useWorkSites = () => {
  return useQuery({
    queryKey: ['work-sites'],
    queryFn: getWorkSites,
  });
};
