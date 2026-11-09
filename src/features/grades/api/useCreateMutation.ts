import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createGrade } from './create';

export const useCreateGradeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
  });
};
