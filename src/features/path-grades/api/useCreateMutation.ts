import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createPathGrade } from './create';

export const useCreatePathGradeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPathGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['path-grades'] });
    },
  });
};
