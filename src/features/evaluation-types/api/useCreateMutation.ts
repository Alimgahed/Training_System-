import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createEvaluationType } from './create';

export const useCreateEvaluationTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEvaluationType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evaluation-types'] });
    },
  });
};
