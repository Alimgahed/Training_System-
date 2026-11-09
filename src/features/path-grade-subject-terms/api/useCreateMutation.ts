import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createPathGradeSubjectTerm } from './create';

export const useCreatePathGradeSubjectTermMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPathGradeSubjectTerm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['path-grade-subject-terms'] });
    },
  });
};
