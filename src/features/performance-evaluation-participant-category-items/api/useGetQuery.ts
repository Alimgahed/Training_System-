import { useQuery } from '@tanstack/react-query';
import { getPerformanceEvaluationParticipantCategoryItem } from './get';

export const usePerformanceEvaluationParticipantCategoryItem = (id: string | number) => {
  return useQuery({
    queryKey: ['performance-evaluation-participant-category-item', id],
    queryFn: () => getPerformanceEvaluationParticipantCategoryItem(id),
    enabled: !!id,
  });
};
