import { useQuery } from '@tanstack/react-query';
import { getWorkCenters } from './list';

export const useWorkCenters = () => {
  return useQuery({
    queryKey: ['work-centers'],
    queryFn: getWorkCenters,
  });
};
