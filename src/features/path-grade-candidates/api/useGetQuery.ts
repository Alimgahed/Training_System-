import { useQuery } from '@tanstack/react-query';
import { getPathGradeCandidate } from './get';

export const usePathGradeCandidate = (id: string | number) => {
  return useQuery({
    queryKey: ['path-grade-candidate', id],
    queryFn: () => getPathGradeCandidate(id),
    enabled: !!id,
  });
};
