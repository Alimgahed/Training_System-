import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createParticipantType } from './create';

export const useCreateParticipantTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createParticipantType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participant-types'] });
    },
  });
};
