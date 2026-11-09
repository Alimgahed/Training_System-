import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createDocumentation } from './create';

export const useCreateDocumentationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDocumentation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentations'] });
    },
  });
};
