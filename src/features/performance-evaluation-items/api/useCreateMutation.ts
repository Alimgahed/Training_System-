import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createPerformanceEvaluationItem } from './create';

export const useCreatePerformanceEvaluationItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPerformanceEvaluationItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['performance-evaluation-items'] });
    },
  });
};
