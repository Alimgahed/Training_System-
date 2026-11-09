import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createJobTypeGroup } from './create';

export const useCreateJobTypeGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJobTypeGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-type-groups'] });
    },
  });
};
