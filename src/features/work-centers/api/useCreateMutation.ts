import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createWorkCenter } from './create';

export const useCreateWorkCenterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkCenter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-centers'] });
    },
  });
};
