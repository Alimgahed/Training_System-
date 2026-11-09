import { useQuery } from '@tanstack/react-query';
import { getPerformanceEvaluationItem } from './get';

export const usePerformanceEvaluationItem = (id: string | number) => {
  return useQuery({
    queryKey: ['performance-evaluation-item', id],
    queryFn: () => getPerformanceEvaluationItem(id),
    enabled: !!id,
  });
};
