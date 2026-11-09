import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createPerformanceEvaluationParticipantCategoryItem } from './create';

export const useCreatePerformanceEvaluationParticipantCategoryItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPerformanceEvaluationParticipantCategoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['performance-evaluation-participant-category-items'] });
    },
  });
};
