import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createCountry } from './create';

export const useCreateCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
};
