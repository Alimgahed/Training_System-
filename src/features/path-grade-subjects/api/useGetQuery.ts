import { useQuery } from '@tanstack/react-query';
import { getPathGradeSubject } from './get';

export const usePathGradeSubject = (id: string | number) => {
  return useQuery({
    queryKey: ['path-grade-subject', id],
    queryFn: () => getPathGradeSubject(id),
    enabled: !!id,
  });
};
