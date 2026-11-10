import { useQuery } from '@tanstack/react-query';
import { getPathGradeSubjects } from './list';

export const usePathGradeSubjects = (enabled = true) => {
  return useQuery({
    enabled,
    queryKey: ['path-grade-subjects'],
    queryFn: getPathGradeSubjects,
  });
};
