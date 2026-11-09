import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createWorkSite } from './create';

export const useCreateWorkSiteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkSite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-sites'] });
    },
  });
};
