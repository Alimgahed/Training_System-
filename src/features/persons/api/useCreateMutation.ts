import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createPerson } from './create';

export const useCreatePersonMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] });
    },
  });
};
