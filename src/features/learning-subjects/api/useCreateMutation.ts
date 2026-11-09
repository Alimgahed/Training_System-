import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createLearningSubject } from './create';

export const useCreateLearningSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLearningSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-subjects'] });
    },
  });
};
