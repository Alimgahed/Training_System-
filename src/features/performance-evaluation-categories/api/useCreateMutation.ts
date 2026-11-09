import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createPerformanceEvaluationCategory } from './create';

export const useCreatePerformanceEvaluationCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPerformanceEvaluationCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['performance-evaluation-categories'] });
    },
  });
};
