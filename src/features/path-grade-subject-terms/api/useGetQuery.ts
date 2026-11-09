import { useQuery } from '@tanstack/react-query';
import { getPathGradeSubjectTerm } from './get';

export const usePathGradeSubjectTerm = (id: string | number) => {
  return useQuery({
    queryKey: ['path-grade-subject-term', id],
    queryFn: () => getPathGradeSubjectTerm(id),
    enabled: !!id,
  });
};
