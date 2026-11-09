import { useQuery } from '@tanstack/react-query';
import { getPerformanceEvaluationItems } from './list';

export const usePerformanceEvaluationItems = () => {
  return useQuery({
    queryKey: ['performance-evaluation-items'],
    queryFn: getPerformanceEvaluationItems,
  });
};
