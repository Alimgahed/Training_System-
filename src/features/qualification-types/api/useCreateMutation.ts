import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createQualificationType } from './create';

export const useCreateQualificationTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQualificationType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualification-types'] });
    },
  });
};
