import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createOrganizationType } from './create';

export const useCreateOrganizationTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrganizationType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization-types'] });
    },
  });
};
