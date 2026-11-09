import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createQualification } from './create';

export const useCreateQualificationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQualification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualifications'] });
    },
  });
};
