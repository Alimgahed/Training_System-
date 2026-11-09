import { useQuery } from '@tanstack/react-query';
import { getPathGradeSubjectTerms } from './list';

export const usePathGradeSubjectTerms = () => {
  return useQuery({
    queryKey: ['path-grade-subject-terms'],
    queryFn: getPathGradeSubjectTerms,
  });
};
