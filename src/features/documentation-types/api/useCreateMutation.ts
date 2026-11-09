import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createDocumentationType } from './create';

export const useCreateDocumentationTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDocumentationType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentation-types'] });
    },
  });
};
