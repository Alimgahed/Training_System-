import { useQuery } from '@tanstack/react-query';
import { getPerformanceEvaluationParticipantCategorys } from './list';

export const usePerformanceEvaluationParticipantCategorys = () => {
  return useQuery({
    queryKey: ['performance-evaluation-participant-categories'],
    queryFn: getPerformanceEvaluationParticipantCategorys,
  });
};
