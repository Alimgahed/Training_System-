import { useQuery } from '@tanstack/react-query';
import { getPathGradeSubjectTerms } from './list';

export const usePathGradeSubjectTerms = (enabled = true) => {
  return useQuery({
    enabled,
    queryKey: ['path-grade-subject-terms'],
    queryFn: getPathGradeSubjectTerms,
  });
};
