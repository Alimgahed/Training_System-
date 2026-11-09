import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createLearningPath } from './create';

export const useCreateLearningPathMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLearningPath,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-paths'] });
    },
  });
};
