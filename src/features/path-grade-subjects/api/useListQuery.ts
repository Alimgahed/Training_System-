import { useQuery } from '@tanstack/react-query';
import { getPathGradeSubjects } from './list';

export const usePathGradeSubjects = () => {
  return useQuery({
    queryKey: ['path-grade-subjects'],
    queryFn: getPathGradeSubjects,
  });
};
