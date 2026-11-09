import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createPerformanceEvaluationParticipantCategory } from './create';

export const useCreatePerformanceEvaluationParticipantCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPerformanceEvaluationParticipantCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['performance-evaluation-participant-categories'] });
    },
  });
};
