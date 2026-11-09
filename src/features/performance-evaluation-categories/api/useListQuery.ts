import { useQuery } from '@tanstack/react-query';
import { getPerformanceEvaluationCategorys } from './list';

export const usePerformanceEvaluationCategorys = () => {
  return useQuery({
    queryKey: ['performance-evaluation-categories'],
    queryFn: getPerformanceEvaluationCategorys,
  });
};
