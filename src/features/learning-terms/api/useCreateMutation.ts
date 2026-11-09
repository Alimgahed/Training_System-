import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createLearningTerm } from './create';

export const useCreateLearningTermMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLearningTerm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-terms'] });
    },
  });
};
