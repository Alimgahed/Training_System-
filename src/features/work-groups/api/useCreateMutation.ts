import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createWorkGroup } from './create';

export const useCreateWorkGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-groups'] });
    },
  });
};
