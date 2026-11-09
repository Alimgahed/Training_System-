import { useQuery } from '@tanstack/react-query';
import type { PerformanceEvaluationParticipantCategoryItemFilters } from './list';
import { getPerformanceEvaluationParticipantCategoryItems } from './list';

export const usePerformanceEvaluationParticipantCategoryItems = (filters: PerformanceEvaluationParticipantCategoryItemFilters = {}) => {
  const activeFilters = Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined));
  return useQuery({
    queryKey: ['performance-evaluation-participant-category-items', activeFilters],
    queryFn: () => getPerformanceEvaluationParticipantCategoryItems(filters),
  });
};
