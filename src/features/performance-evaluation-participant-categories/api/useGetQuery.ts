import { useQuery } from '@tanstack/react-query';
import { getPerformanceEvaluationParticipantCategory } from './get';

export const usePerformanceEvaluationParticipantCategory = (id: string | number) => {
  return useQuery({
    queryKey: ['performance-evaluation-participant-category', id],
    queryFn: () => getPerformanceEvaluationParticipantCategory(id),
    enabled: !!id,
  });
};
