import { useQuery } from '@tanstack/react-query';
import { getPathGradeCandidates } from './list';

export const usePathGradeCandidates = () => {
  return useQuery({
    queryKey: ['path-grade-candidates'],
    queryFn: getPathGradeCandidates,
  });
};
