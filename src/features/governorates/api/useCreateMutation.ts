import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createGovernorate } from './create';

export const useCreateGovernorateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGovernorate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['governorates'] });
    },
  });
};
