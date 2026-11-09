import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createPathGradeSubject } from './create';

export const useCreatePathGradeSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPathGradeSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['path-grade-subjects'] });
    },
  });
};
