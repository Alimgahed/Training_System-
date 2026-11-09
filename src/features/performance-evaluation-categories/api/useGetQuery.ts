import { useQuery } from '@tanstack/react-query';
import { getPerformanceEvaluationCategory } from './get';

export const usePerformanceEvaluationCategory = (id: string | number) => {
  return useQuery({
    queryKey: ['performance-evaluation-category', id],
    queryFn: () => getPerformanceEvaluationCategory(id),
    enabled: !!id,
  });
};
